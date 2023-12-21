import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import $c from "classnames";
const DragSort: React.FunctionComponent = () => {
    /* 随机生成应用列表 */
    const getAppList = () => {
        const tempArr: any[] = [];
        for (let index = 1; index < 10; index++) {
            tempArr.push({
                id: index,
                name: `应用${index}`,
                backgroundColor: getRandomColor(),
                moduleType: index === 5 ? 1 : 0
            });
        }
        return tempArr;
    };

    /* 随机生成背景颜色 */
    const getRandomColor = () => {
        let letter = `0123456789ABCDEF`;
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letter[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // 应用列表
    const [list, setList] = useState<any[]>([]);

    // 当前拖拽对象
    const [oldDragItem, setOldDrageItem] = useState<any>();

    // 拖拽交换对象
    const [newDragItem, setNewDragItem] = useState<any>();

    // 是否拖拽进行
    const [isEnter, setIsEnter] = useState<any>();

    // 是否拖拽
    const [isActive, setIsActive] = useState<any>();

    /* 拖拽开始 */
    const onDragStart = (value: any) => {
        setOldDrageItem(value);
        setIsActive(value.id);
    };

    /* 拖拽进行 */
    const onDragEnter = (value: any) => {
        setIsEnter(value.id);
        setNewDragItem(value);
    };

    /* 拖拽结束 */
    const onDragEnd = () => {
        if (oldDragItem != newDragItem) {
            console.log(oldDragItem,newDragItem)
            const oldIndex = list.indexOf(oldDragItem); //获取当前对象所在数组坐标
            const newIndex = list.indexOf(newDragItem); //获取当前目标对象所在数组坐标
            const newArray = [...list];
            console.log(oldIndex,newIndex)
            newArray.splice(oldIndex, 1); //删除老节点
            newArray.splice(newIndex, 0, oldDragItem); //增加新节点
            setList(newArray); //保存拖拽后的数组
            setIsActive(-1); //重置状态
            setIsEnter(-1);
        }
    };

    useEffect(() => {
        document.addEventListener('dragover', function (event: any) {
            //阻止事件的默认行为
            event.preventDefault();
            //设置拖拽时鼠标样式
            event.dataTransfer.dropEffect = 'move';
        });
        // 赋值列表
        setList(getAppList());
    }, []);

    return (
        <Row className="list">
            {console.log(list)}
            {list?.map((item: any, index: number) => (
                <Col
                    style={{
                        backgroundColor: item.backgroundColor,
                    }}
                    className={$c("item", {
                        active: oldDragItem == item && isActive == item.id,
                        enter: newDragItem == item && isEnter == item.id,
                        large: item.moduleType === 1
                    })}
                    key={item.id}
                    draggable={true}
                    onDragStart={() => {
                        onDragStart(item);
                    }}
                    onDragEnter={() => {
                        onDragEnter(item);
                    }}
                    onDragEnd={() => {
                        onDragEnd();
                    }}
                >
                    {item.name}
                </Col>
            ))}
        </Row>
    );
};

export default DragSort;