import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { classNames } from "../utils";

type TabsContextValue = {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setRect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
  setTransition: React.Dispatch<React.SetStateAction<boolean>>;
  getTabIndex: (tabEl: HTMLButtonElement | null) => number;
  setTabElList: React.Dispatch<React.SetStateAction<HTMLElement[]>>;
};

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined
);

export default function Tabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transition, setTransition] = useState(false);
  const [rect, setRect] = useState<DOMRect>();
  const [tabElList, setTabElList] = useState<HTMLElement[]>([]);

  const getTabIndex = useCallback(
    (tabEl: HTMLButtonElement | null) => {
      if (!tabEl) return -1;
      return tabElList.indexOf(tabEl);
    },
    [tabElList]
  );

  const tabsContextValue: TabsContextValue = useMemo(
    () => ({
      selectedIndex,
      setSelectedIndex,
      setRect,
      setTransition,
      getTabIndex,
      setTabElList,
    }),
    [
      selectedIndex,
      setSelectedIndex,
      setRect,
      setTransition,
      getTabIndex,
      setTabElList,
    ]
  );

  const transitionStyle = transition ? "all 200ms ease" : undefined;

  return (
    <div className="flex h-full flex-col justify-center">
      <TabsContext.Provider value={tabsContextValue}>
        <div className="flex h-12">
          <Tab className="flex-1 bg-yellow-100 active:bg-yellow-200">Tab</Tab>
          <Tab className="flex-[3] bg-yellow-100 active:bg-yellow-200">Tab</Tab>
          <Tab className="flex-[2] bg-yellow-100 active:bg-yellow-200">Tab</Tab>
        </div>
      </TabsContext.Provider>
      <div
        className="bg-pink-400"
        style={{
          transition: transitionStyle,
          transform: `translate(${rect?.left}px)`,
          width: rect?.width,
          height: 4,
        }}
      />
    </div>
  );
}

type TabProps = {
  index?: number;
} & JSX.IntrinsicElements["button"];

function TabImpl({ children, className }: TabProps) {
  const contextValue = useContext(TabsContext);
  if (!contextValue) throw `context value from TabsContext not found.`;

  const {
    selectedIndex,
    setSelectedIndex,
    setRect,
    setTransition,
    getTabIndex,
    setTabElList,
  } = contextValue;

  const elRef = useRef<HTMLButtonElement | null>(null);

  const index = getTabIndex(elRef.current);
  const isActive = index === selectedIndex;

  useEffect(() => {
    if (!elRef.current || !isActive) return;

    const el = elRef.current;

    let initialCall = true;
    const rObserver = new ResizeObserver(() => {
      setRect(el.getBoundingClientRect());

      if (initialCall) {
        initialCall = false;
      } else {
        setTransition(false);
      }
    });

    rObserver.observe(el);

    return () => {
      rObserver.unobserve(el);
    };
  }, [isActive, setRect, setTransition]);

  const handleClick = () => {
    if (!elRef.current) return;

    const el = elRef.current;

    setRect(el.getBoundingClientRect());
    setSelectedIndex(index);
    setTransition(true);
  };

  const handleRef = useCallback(
    (ref: HTMLButtonElement | null) => {
      if (ref) {
        setTabElList((list) => {
          const newList = [...list, ref];

          newList.sort((nodeA, nodeB) => {
            const compare = nodeA.compareDocumentPosition(nodeB);
            if (compare & Node.DOCUMENT_POSITION_FOLLOWING) {
              // a < b
              return -1;
            }

            if (compare & Node.DOCUMENT_POSITION_PRECEDING) {
              return 1;
            }

            throw "cannot determine the order of tab elements";
          });

          return newList;
        });
        elRef.current = ref;
      } else {
        // to deal with react fast refresh.
        // react refresh will create a new dom node and call this function again.
        // but before it does that, it calls this function with ref=null first.
        // so we have to remove the old dom reference before react calls this function
        // with the new dom ref again.
        setTabElList((list) => {
          if (elRef.current) {
            const newList = list.filter((el) => el !== elRef.current);
            newList.sort((nodeA, nodeB) => {
              const compare = nodeA.compareDocumentPosition(nodeB);
              if (compare & Node.DOCUMENT_POSITION_FOLLOWING) {
                // a < b
                return -1;
              }

              if (compare & Node.DOCUMENT_POSITION_PRECEDING) {
                return 1;
              }

              throw "cannot determine the order of tab elements";
            });
            return newList;
          }
          throw "program should not reach here.";
        });
      }
    },
    [setTabElList]
  );

  return (
    <button
      ref={handleRef}
      onClick={handleClick}
      className={classNames(className)}
    >
      {children}
      {getTabIndex(elRef.current)}
    </button>
  );
}

const Tab = React.memo(TabImpl);
