import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Pagination,
  Radio,
  RadioChangeEvent,
  Table,
  message,
} from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DragOutlined,
} from "@ant-design/icons";
import Mock from "mockjs";
import {
  useBoolean,
  useDebounce,
  useDynamicList,
  useHistoryTravel,
  useInfiniteScroll,
  useMap,
  useMount,
  useNetwork,
  usePagination,
  useTextSelection,
  useUnmount,
  useUnmountedRef,
  useVirtualList,
} from "ahooks";
// import ReactDragListView from 'react-drag-listview';
const dividerStyle = {
  color: "#75787c",
  fontSize: 14,
};

interface Result {
  list: string[];
  nextId: string | undefined;
}
interface UserListItem {
  id: string;
  name: string;
  gender: "male" | "female";
  email: string;
  disabled: boolean;
}
interface Item {
  name?: string;
  age?: string;
  memo?: string;
}

export default function MoreHook() {
  return (
    <div style={{ maxHeight: 540, overflow: "auto" }}>
      {/* useInfiniteScroll */}
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useInfiniteScroll</b>封装了常见的加载更多-无限滚动逻辑。
      </Divider>
      <UseInfiniteScroll />
      {/* usePagination */}
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>usePagination</b>封装了常见的分页逻辑。
      </Divider>
      <UsePagination />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useDynamicList_1</b>
        一个帮助你管理动态列表状态，并能生成唯一key的Hook。
      </Divider>
      <UseDynamicList />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useDynamicList_2</b>可拖拽的动态表格。
      </Divider>
      <DragUseDynamicList />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useVirtualList</b>提供虚拟化列表能力的
        Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。
      </Divider>
      <UseVirtualList />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useHistoryTravel</b>
        管理状态历史变化记录，方便在历史记录中前进与后退。
      </Divider>
      <UseHistoryTravel />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useNetwork</b>管理网络连接状态的 Hook。
      </Divider>
      <UseNetwork />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useTextSelection</b>实时获取用户当前选取的文本内容及位置。
      </Divider>
      <UseTextSelection />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useMount</b>只在组件初始化时执行的 Hook。
        <br />
        <b>useUnmount</b>在组件卸载（unmount）时执行的 Hook.
        <br />
        <b>unmountedRef</b>unmountedRef.current 代表组件是否已经卸载
      </Divider>
      <UseMount />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useDebounce</b>用来处理防抖值的 Hook。
      </Divider>
      <UseDebounce />
      <Divider style={{ ...dividerStyle }} orientation="left">
        <b>useMap</b>管理 Map 类型状态的 Hook。
      </Divider>
      <UseMap />
    </div>
  );
}

// 下面是每个组件实现的功能模块

/*--------------------------------------------------------------------------------
 *--useInfiniteScroll-------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------
 */
function UseInfiniteScroll() {
  const { data, loading, loadMore, loadingMore } = useInfiniteScroll((d) =>
    getLoadMoreList(d?.nextId, 2)
  );
  const resultData = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];
  function getLoadMoreList(
    nextId: string | undefined,
    limit: number
  ): Promise<Result> {
    let start = 0;
    if (nextId) {
      start = resultData.findIndex((i) => i === nextId);
    }
    const end = start + limit;
    const list = resultData.slice(start, end);
    const nId = resultData.length >= end ? resultData[end] : undefined;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list,
          nextId: nId,
        });
      }, 1000);
    });
  }

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {data?.list?.map((item) => (
            <div
              key={item}
              style={{ padding: 12, border: "1px solid #f5f5f5" }}
            >
              item-{item}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        {data?.nextId && (
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading more..." : "Click to load more"}
          </button>
        )}

        {!data?.nextId && <span>No more data</span>}
      </div>
    </>
  );
}

/*--------------------------------------------------------------------------------
 *--usePagination-------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------
 */
function UsePagination() {
  const [gender, setGender] = useState<string>("male");
  const {
    data: myData,
    loading: myLoading,
    pagination,
    // run,
    // params,
  } = usePagination(
    ({ current, pageSize }, g: string) => {
      return getUserList({
        current,
        pageSize,
        gender: g,
      });
    },
    {
      // manual: true,
      refreshDeps: [gender], //替换下面useEffect写法，效果一样
    }
  );
  // const { data, loading, pagination, run, params } = usePagination(
  //   ({ current, pageSize }, g: string) => {
  //     return getUserList({
  //       current,
  //       pageSize,
  //       gender: g,
  //     });
  //   },
  //   {
  //     manual: true,
  //   },
  // );
  // useEffect(() => {
  //   run(
  //     {
  //       current: 1,
  //       pageSize: params[0]?.pageSize || 10,
  //     },
  //     gender
  //   );
  // }, [gender]);
  async function getUserList(params: {
    current: number;
    pageSize: number;
    gender: string;
  }): Promise<{ total: number; list: UserListItem[] }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userList(params.current, params.pageSize));
      }, 1000);
    });
  }
  const userList = (current: number, pageSize: number) => {
    const arr = Mock.mock({
      total: 55,
      [`list|${pageSize}`]: [
        {
          id: "@guid",
          name: "@name",
          "gender|1": ["male", "female"],
          email: "@email",
          disabled: false,
        },
      ],
    });
    console.log(arr);
    return Mock.mock({
      total: 55,
      [`list|${pageSize}`]: [
        {
          id: "@guid",
          name: "@name",
          "gender|1": ["male", "female"],
          email: "@email",
          disabled: false,
        },
      ],
    });
  };
  return (
    <>
      {/* 增加一个性别参数  */}
      <Radio.Group
        options={[
          { label: "male", value: "male" },
          { label: "female", value: "female" },
        ]}
        onChange={({ target: { value } }: RadioChangeEvent) => {
          setGender(value);
        }}
        value={gender}
        optionType="button"
        buttonStyle="solid"
      />
      <div>
        {myLoading ? (
          <p>loading....</p>
        ) : (
          <ul>
            {myData?.list?.map((item) => (
              <li key={item.email}>
                {item.name} - {item.email}
              </li>
            ))}
          </ul>
        )}
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={myData?.total}
          onChange={pagination.onChange}
          onShowSizeChange={pagination.onChange}
          showQuickJumper
          size="small"
          showSizeChanger
          style={{ marginTop: 16 }}
        />
      </div>
    </>
  );
}

/*--------------------------------------------------------------------------------
 *--useDynamicList-------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------
 */
function UseDynamicList() {
  const [form] = Form.useForm();
  const [result, setResult] = useState("");
  const { list, remove, getKey, insert, resetList, sortList } = useDynamicList([
    "David",
    "Jack",
  ]);
  const Row = (index: number, item: any) => (
    <div style={{ display: "flex" }} key={getKey(index)}>
      <div>
        <Form.Item
          rules={[{ required: true, message: "required" }]}
          name={["names", getKey(index)]}
          initialValue={item.name}
        >
          <Input style={{ width: 300 }} placeholder="Please enter your name" />
        </Form.Item>
      </div>
      <div style={{ marginTop: 4 }}>
        {list.length > 1 && (
          <MinusCircleOutlined
            style={{ marginLeft: 8 }}
            onClick={() => {
              remove(index);
            }}
          />
        )}
        <PlusCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => {
            insert(index + 1, "");
          }}
        />
      </div>
    </div>
  );
  return (
    <>
      <Form form={form}>{list.map((ele, index) => Row(index, ele))}</Form>
      <Button
        type="primary"
        onClick={() =>
          form
            .validateFields()
            .then((val) => {
              console.log(val);
              const sortedResult = sortList(val.names);
              setResult(JSON.stringify(sortedResult, null, 2));
            })
            .catch(() => {})
        }
      >
        Submit
      </Button>
      <Button
        style={{ marginLeft: 16 }}
        onClick={() => resetList(["David", "Jack"])}
      >
        Reset
      </Button>

      <div>{result}</div>
    </>
  );
}

// 可拖拽的动态表格
function DragUseDynamicList() {
  const { list, remove, getKey, move, push, sortList, resetList } =
    useDynamicList<Item>([
      { name: "my bro", age: "23", memo: "he's my bro" },
      { name: "my sis", age: "21", memo: "she's my sis" },
      {},
    ]);
  const [form] = Form.useForm();
  const [result, setResult] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, row: Item, index: number) => (
        <>
          <DragOutlined style={{ cursor: "move", marginRight: 8 }} />
          <Form.Item
            name={["params", getKey(index), "name"]}
            initialValue={text}
            noStyle
          >
            <Input style={{ width: 120, marginRight: 16 }} placeholder="name" />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text: string, row: Item, index: number) => (
        <Form.Item
          name={["params", getKey(index), "age"]}
          initialValue={text}
          noStyle
        >
          <Input style={{ width: 120, marginRight: 16 }} placeholder="age" />
        </Form.Item>
      ),
    },
    {
      key: "memo",
      title: "Memo",
      dataIndex: "memo",
      render: (text: string, row: Item, index: number) => (
        <>
          <Form.Item
            name={["params", getKey(index), "memo"]}
            initialValue={text}
            noStyle
          >
            <Input
              style={{ width: 300, marginRight: 16 }}
              placeholder="please input the memo"
            />
          </Form.Item>
          <Button.Group>
            <Button danger onClick={() => remove(index)}>
              Delete
            </Button>
          </Button.Group>
        </>
      ),
    },
  ];
  return (
    <div>
      <Form form={form}>
        {/* <ReactDragListView
          onDragEnd={(oldIndex: number, newIndex: number) => move(oldIndex, newIndex)}
          handleSelector={'span[aria-label="drag"]'}
        > */}
        <Table
          columns={columns}
          dataSource={list}
          rowKey={(r: Item, index: number) => getKey(index).toString()}
          pagination={false}
        />
        {/* </ReactDragListView> */}
      </Form>
      <Button
        style={{ marginTop: 8 }}
        block
        type="dashed"
        onClick={() => push({ name: "new row", age: "25" })}
      >
        + Add row
      </Button>
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={() => {
          form
            .validateFields()
            .then((val) => {
              console.log(val, val.params);
              const sortedResult = sortList(val.params);
              setResult(JSON.stringify(sortedResult, null, 2));
            })
            .catch(() => {});
        }}
      >
        Submit
      </Button>
      <Button
        style={{ marginLeft: 16 }}
        onClick={() =>
          resetList([
            { name: "my bro", age: "23", memo: "he's my bro" },
            { name: "my sis", age: "21", memo: "she's my sis" },
            {},
          ])
        }
      >
        Reset
      </Button>

      <div style={{ whiteSpace: "pre" }}>{result && `content: ${result}`}</div>
    </div>
  );
}

/*--------------------------------------------------------------------------------
 *--useVirtualList-------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------
 */
function UseVirtualList() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const originalList = useMemo(() => Array.from(Array(99999).keys()), []);

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 10,
  });
  return (
    <>
      <div
        ref={containerRef}
        style={{ height: 300, overflow: "auto", border: "1px solid" }}
      >
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: 52,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #e8e8e8",
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/*--------------------------------------------------------------------------------
 *--useVirtualList-------------------------------------------------------------------------------
 *---管理状态历史变化记录，方便在历史记录中前进与后退----------------------------------------------------------------------------------------------
 */

function UseHistoryTravel() {
  const { value, setValue, backLength, forwardLength, back, forward } =
    useHistoryTravel<string>();

  return (
    <div>
      <input value={value || ""} onChange={(e) => setValue(e.target.value)} />
      <button
        disabled={backLength <= 0}
        onClick={back}
        style={{ margin: "0 8px" }}
      >
        back
      </button>
      <button disabled={forwardLength <= 0} onClick={forward}>
        forward
      </button>
    </div>
  );
}

/*--------------------------------------------------------------------------------
 *--useNetwork-------------------------------------------------------------------------------
 *---管理网络连接状态的 Hook。----------------------------------------------------------------------------------------------
 */
function UseNetwork() {
  const networkState = useNetwork();
  return (
    <div>
      <div>Network information: </div>
      <pre>{JSON.stringify(networkState, null, 2)}</pre>
    </div>
  );
}

/*--------------------------------------------------------------------------------
 *--useTextSelection-------------------------------------------------------------------------------
 *---useTextSelection Hook。----------------------------------------------------------------------------------------------
 */
function UseTextSelection() {
  const { text } = useTextSelection();
  return (
    <div>
      <p>You can select text all page.</p>
      <p>Result：{text}</p>
    </div>
  );
}

/*--------------------------------------------------------------------------------
 *--useMount在组件初始化时执行的-------------------------------------------------------------------------------
 *--useUnmount在组件初始化时执行的----------------------------------------------------------------------------------------------
 */
function UseMount() {
  const [state, { toggle }] = useBoolean(false);
  return (
    <div className="flex center">
      <Button type="primary" onClick={toggle} style={{ marginRight: 6 }}>
        {state ? "unmount" : "mount"}
      </Button>
      {state && <MyComponent />}
    </div>
  );
}

const MyComponent = () => {
  const unmountedRef = useUnmountedRef();
  useMount(() => {
    message.info("useMount组件首次渲染时，执行方法");
  });
  useUnmount(() => {
    message.info("useUnmount在组件卸载时，执行函数。");
  });

  useEffect(() => {
    console.log(unmountedRef);
  }, []);

  return <div>Hello World</div>;
};

/*--------------------------------------------------------------------------------
 *--useDebounce用来处理防抖值的 Hook。-------------------------------------------------------------------------------
 *------------------------------------------------------------------------------------------------
 */
function UseDebounce() {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}

function UseMap() {
  const [map, { set, setAll, remove, reset, get }] = useMap<
    string | number,
    string | number
  >([]);

  return (
    <div>
      <Button
        onClick={() =>
          set(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
        }
      >
        add
      </Button>
      <div>{JSON.stringify(Array.from(map), null, 2)}</div>
    </div>
  );
}
