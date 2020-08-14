import G6 from "@antv/g6";

import { bfs, dfs } from "./parseTree";

const data = {
  id: "root",
  children: [
    {
      id: "1",
      children: [
        {
          id: "1-1",
          children: [
            {
              id: "1-1-1",
            },
            {
              id: "1-1-2",
            },
          ],
        },
        { id: "1-2" },
      ],
    },
    {
      id: "2",
      children: [
        {
          id: "2-1",
          children: [
            {
              id: "2-1-1",
            },
          ],
        },
      ],
    },
  ],
};

const width = document.getElementById("container").scrollWidth;
const height = document.getElementById("container").scrollHeight || 500;
const graph = new G6.TreeGraph({
  container: "container",
  width,
  height,
  modes: {
    default: [
      {
        type: "collapse-expand",
        onChange: function onChange(item, collapsed) {
          const data = item.get("model").data;
          data.collapsed = collapsed;
          return true;
        },
      },
      "drag-canvas",
      "zoom-canvas",
    ],
  },
  defaultNode: {
    size: 26,
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
    style: {
      fill: "#C6E5FF",
      stroke: "#5B8FF9",
    },
  },
  defaultEdge: {
    type: "cubic-horizontal",
    style: {
      stroke: "#A3B1BF",
    },
  },
  layout: {
    type: "compactBox",
    direction: "LR",
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 10;
    },
    getHGap: function getHGap() {
      return 100;
    },
  },
});

graph.node(function (node) {
  return {
    label: node.id,
    labelCfg: {
      offset: 10,
      position: node.children && node.children.length > 0 ? "left" : "right",
    },
  };
});
bfs(data, (array) => {
  let id = array[0].id;
  let div = document.createElement("div");
  div.className = "item";
  div.innerText = id;
  document.querySelector("#bfs").appendChild(div);
});
dfs(data, function (array) {
  let id = array[array.length - 1].id;
  let div = document.createElement("div");
  div.className = "item";
  div.innerText = id;
  document.querySelector("#dfs").appendChild(div);
});

graph.data(data);
graph.render();
graph.fitView();
