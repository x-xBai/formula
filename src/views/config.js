import { v4 as uuidv4 } from "uuid"
export const data = [
  {
    name: "+",
  },
  {
    name: "-",
  },
  {
    name: "*",
  },
  {
    name: "/",
  },
  {
    name: "%",
  },
  {
    name: "Math.floor( )",
  },
  {
    name: "Math.ceil( )",
  },
  {
    name: "Math.max( )",
  },
  {
    name: "Math.min( )",
  },
  {
    name: ">=",
  },
  {
    name: "&&",
  },
]
export const paramData = [
  {
    name: "最大高度",
    key: "maxHeight",
    value: null,
  },
  {
    name: "最小高度",
    key: "minHeight",
    value: null,
  },
  {
    name: "最大宽度",
    key: "maxWidth",
    value: null,
  },
  {
    name: "最小宽度",
    key: "minWidth",
    value: null,
  },
  {
    name: "大小",
    key: "size",
    value: null,
  },
  {
    name: "重量",
    key: "weight",
    value: null,
  },
]
export const retuenData = (data) => {
  return data.map((v) => {
    return {
      ...v,
      id: uuidv4(),
    }
  })
}

export const tabs = [
  {
    name: "公式",
    type: "0",
    id: uuidv4(),
    data: retuenData(data),
  },
  {
    name: "参数",
    type: "1",
    id: uuidv4(),
    data: retuenData(paramData),
  },
]
