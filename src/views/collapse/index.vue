<template>
  <div>
    <div
      class="collapse"
      v-for="(item, index) in data"
      :key="index"
      @click="handleClick(item)"
    >
      <div class="collapse-item">
        <span class="caret-right">
          <i
            :class="
              expandIds.includes(item.id)
                ? 'el-icon-caret-bottom'
                : 'el-icon-caret-right'
            "
          ></i>
        </span>
        <el-checkbox
          @change="handleChange(item)"
          v-model="item.checked"
        ></el-checkbox>
        <div class="item-text">{{ item.lable }}</div>
      </div>
      <ul
        v-if="item.children.length > 0"
        :class="expandIds.includes(item.id) ? 'active' : ''"
      >
        <li v-for="(cur, ind) in item.children" :key="ind">
          <el-checkbox
            @change="handleChangeChildren(item, cur)"
            v-model="cur.checked"
          ></el-checkbox>
          <div class="children-item">{{ cur.lable }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据源
    data: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            lable: "第一行",
            checked: false,
            children: [
              { id: 2, lable: "子级2", checked: false },
              { id: 3, lable: "子级1", checked: false },
              { id: 4, lable: "子级3", checked: false },
            ],
          },
          {
            id: 5,
            lable: "第二行",
            checked: false,
            children: [
              { id: 6, lable: "子级1", checked: false },
              { id: 7, lable: "子级2", checked: false },
              { id: 8, lable: "子级3", checked: false },
            ],
          },
          {
            id: 9,
            lable: "第三行",
            checked: false,
            children: [
              { id: 10, lable: "子级1", checked: false },
              { id: 11, lable: "子级2", checked: false },
              { id: 12, lable: "子级3", checked: false },
            ],
          },
          {
            id: 13,
            lable: "第四行",
            checked: false,
            children: [
              { id: 14, lable: "子级1", checked: false },
              { id: 15, lable: "子级2", checked: false },
              { id: 16, lable: "子级3", checked: false },
            ],
          },
        ];
      },
    },
    // 是否手风琴模式
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expandIds: [], // 需要展开的某一项id
      checkedIds: [], // 勾选中的id
    };
  },
  methods: {
    // 展开某一项
    handleClick({ id }) {
      if (this.accordion) {
        this.expandIds = [];
        this.expandIds.push(id);
      } else {
        this.setIds(id);
      }
    },
    // 展开每一项
    setIds(id) {
      if (this.expandIds.includes(id)) {
        for (let index = 0; index < this.expandIds.length; index++) {
          const element = this.expandIds[index];
          if (element === id) {
            this.expandIds.splice(index, 1);
          }
        }
      } else {
        this.expandIds.push(id);
      }
    },
    // 父级勾选
    handleChange({ id, checked, children }) {
      children.forEach((cur) => {
        cur.checked = checked;
        if (checked) {
          if (!this.checkedIds.includes(cur.id)) {
            this.checkedIds.push(cur.id);
          }
        } else {
          for (let index = 0; index < this.checkedIds.length; index++) {
            const checkId = this.checkedIds[index];
            if (cur.id === checkId) {
              this.checkedIds.splice(index, 1);
            }
          }
        }
      });
      console.log("sds7", this.checkedIds);
    },
    // 子级勾选
    handleChangeChildren(value, childrenValue) {
      value.checked = value.children.every((cur) => cur.checked);
      if (
        childrenValue.checked &&
        !this.checkedIds.includes(childrenValue.id)
      ) {
        this.checkedIds.push(childrenValue.id);
      } else {
        for (let index = 0; index < this.checkedIds.length; index++) {
          const checkId = this.checkedIds[index];
          if (!childrenValue.checked && childrenValue.id === checkId) {
            this.checkedIds.splice(index, 1);
          }
        }
      }
      console.log("sds", this.checkedIds);
    },
  },
};
</script>

<style>
body,
ul {
  margin: 0;
  padding: 0;
}
.collapse {
  width: 260px;
  margin: 0 auto;
  overflow: hidden;
}
.collapse-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  cursor: pointer;
  box-shadow: 5px 5px 10px -4px #aaa;
}
.el-icon-caret-bottom {
  transition: all 0.5s;
  -webkit-transform: rotate(5deg);
}
.caret-right {
  margin-right: 10px;
}
.item-text {
  margin-left: 10px;
}
ul {
  box-sizing: border-box;
  height: 0px;
  transition: all 0.5s;
  /* background: red; */
  padding-left: 20px;
}
ul li {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  list-style: none;
}
.children-item {
  margin-left: 10px;
}
.active {
  height: 200px;
}
</style>