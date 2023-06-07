import { useRequest } from "ahooks";
import { RadioChangeEvent, Tag } from "antd";
import { Button, Input, message, Divider, Radio } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Mock from "mockjs";
const dividerStyle = {
  color: "#918f8f",
  fontSize: 14,
};
function changeUsername(username: string): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
}
function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 100) > 50) {
        resolve("请求成功！");
      } else {
        reject(new Error("Failed to get username"));
      }
    }, 2000);
  });
}

function getName(id: number): Promise<string> {
  // console.log("参数use-request-refresh-id", id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock("@name"));
    }, 1000);
  });
}

function getUsername2(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock("@name"));
    }, 1000);
  });
}

function editUsername(username: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error("Failed to modify username"));
      }
    }, 1000);
  });
}
/********API注解*******
 const {
  loading: boolean,
  data?: TData,
  error?: Error,
  params: TParams || [],
  run: (...params: TParams) => void,
  runAsync: (...params: TParams) => Promise<TData>,
  refresh: () => void,
  refreshAsync: () => Promise<TData>,
  mutate: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
  cancel: () => void,
} = useRequest<TData, TParams>(
  service: (...args: TParams) => Promise<TData>,
  {
    manual?: boolean,
    defaultParams?: TParams,
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
 */

async function getUserSchool(userId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userSchool(userId));
    }, 500);
  });
}

function userSchool(id: string) {
  const _user_ = ["张三", "李四", "王五"];
  return _user_[Number(id)];
}

async function getEmail(search?: string): Promise<string[]> {
  // console.log("debounce getEmail", search);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ "data|5": ["@email"] }).data);
    }, 300);
  });
}

export default function UseRequest() {
  const lastRef = useRef<string>();
  const [name, setName] = useState("");

  const [state, setState] = useState("");
  const [userId, setUserId] = useState("");
  //手动触发
  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    loadingDelay: 300, //假如 changeUsername 在 300ms 内返回，则 loading 不会变成 true，避免了页面展示 Loading... 的情况。
    onBefore: (params) => {
      console.log("请求之前触发：", params[0]);
    },
    onSuccess: (result, params) => {
      if (result.success) {
        setName("");
        message.success("_________________________" + params[0]);
      }
    },
    onError: (error) => {
      console.log("请求失败触发", error.message);
    },
    onFinally: (params, result, error) => {
      console.log("请求完成触发Request finish");
    },
  });
  //默认触发
  const {
    data,
    loading: $loading,
    error,
  } = useRequest(getUsername, {
    refreshOnWindowFocus: true, //在屏幕重新获取焦点或重新显示时，重新发起请求
    focusTimespan: 3000, //重新请求间隔，单位为毫秒
  });
  // refresh 和 refreshAsync 方法
  const {
    data: myData,
    loading: myLoading,
    run: myRun,
    refresh,
  } = useRequest((id: number) => getName(id), {
    manual: true,
  });
  useEffect(() => {
    myRun(1);
  }, []);

  // get username
  const {
    data: username,
    loading: zLoading,
    mutate,
  } = useRequest(getUsername2);
  // edit username
  const { run: editRun } = useRequest(editUsername, {
    manual: true,
    onSuccess: (result, params) => {
      setState("");
      message.success(`The username was changed to "${params[0]}" !`);
    },
    onError: (error) => {
      message.error(error.message);
      mutate(lastRef.current);
    },
  });
  const onSend = () => {
    lastRef.current = username;
    mutate(state);
    editRun(state);
  };
  //轮询
  const {
    run: lxRun,
    loading: lxloading,
    data: lxData,
    cancel,
  } = useRequest(getName, {
    manual: true,
    pollingInterval: 1000,
    pollingWhenHidden: false,
    // pollingErrorRetryCount: 3,轮询错误重试次数
  });
  //依赖刷新
  const { data: userData, loading: userLoadidng } = useRequest(
    () => getUserSchool(userId),
    {
      refreshDeps: [userId],
      loadingDelay: 300,
    }
  );
  //防抖
  const {
    data: fdData,
    loading: fdloading,
    run: fdRun,
  } = useRequest(getEmail, {
    debounceWait: 1000,
    manual: true,
  });
  //节流
  const {
    data: jlData,
    loading: jlloading,
    run: jlRun,
  } = useRequest(getEmail, {
    throttleWait: 1000,
    manual: true,
  });
  return (
    <div style={{ maxHeight: 540, overflow: "auto" }}>
      <Divider style={{ ...dividerStyle }} orientation="left">
        手动触发
      </Divider>
      <div className="flex">
        <Input
          style={{ width: 200, marginRight: 10 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="primary" loading={loading} onClick={() => run(name)}>
          {loading ? "loading" : "提交"}
        </Button>
      </div>
      <Divider style={{ ...dividerStyle }} orientation="left">
        默认触发
      </Divider>
      <div>
        {data && <span style={{ color: "#05d545" }}>{data}</span>}
        {$loading && <span style={{ color: "#0081fb" }}>加载中....</span>}
        {error && <span style={{ color: "#fb0000" }}>加载失败....</span>}
      </div>
      <section className="remarkeStyle">
        refresh 和 refreshAsync 方法，使我们可以使用上一次的参数，重新发起请求
      </section>
      <div className="flex center">
        {myLoading && <span style={{ color: "#1677ff" }}>loading...</span>}
        <p>Username: {myData}</p>
        <Button onClick={refresh}>重载</Button>
      </div>
      <section className="remarkeStyle">
        useRequest 提供了 mutate, 支持立即修改 useRequest 返回的 data 参数。
      </section>
      <p>Username_________: {username}</p>
      <div className="flex">
        <Input
          style={{ width: 200, marginRight: 10 }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Button type="primary" loading={zLoading} onClick={onSend}>
          edit
        </Button>
      </div>
      <section style={{ marginTop: 10 }} className="remarkeStyle">
        <b>轮询</b>
      </section>
      <div>
        <p>Username: {lxloading ? "Loading" : lxData}</p>
        <Button className="margin-r-6" onClick={cancel}>
          STOP
        </Button>
        <Button type="primary" onClick={() => lxRun(2)}>
          START
        </Button>
      </div>
      <section style={{ margin: "10px 0" }} className="remarkeStyle">
        <b>依赖刷新</b>
      </section>
      <div>
        <Radio.Group
          options={[
            { label: "张三", value: "0" },
            { label: "李四", value: "1" },
            { label: "王五", value: "2" },
          ]}
          onChange={({ target: { value } }: RadioChangeEvent) => {
            setUserId(value);
          }}
          value={userId}
          optionType="button"
          buttonStyle="solid"
        />
        <p>School: {userLoadidng ? "Loading..." : userData}</p>
      </div>
      <section style={{ margin: "10px 0" }} className="remarkeStyle">
        <b>防抖</b>
      </section>
      <div>
        <Input
          style={{ width: 200, marginBottom: 10 }}
          placeholder="防抖"
          onChange={(e) => fdRun(e.target.value)}
        />
        {fdloading ? (
          "加载中..."
        ) : (
          <ul>
            {fdData?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      <section style={{ margin: "10px 0" }} className="remarkeStyle">
        <b>节流</b>--频繁触发 run，只会每隔指定时段执行一次
      </section>
      <div>
        <Input
          style={{ width: 200, marginBottom: 10 }}
          placeholder="节流"
          onChange={(e) => jlRun(e.target.value)}
        />
        {jlloading ? (
          "加载中..."
        ) : (
          <ul>
            {jlData?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
