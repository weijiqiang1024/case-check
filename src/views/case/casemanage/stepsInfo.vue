<template>
  <div>
    <a-steps :current="(this.record.length-1)" size="small">
      <a-step
        v-for="item in record"
        :key="item.title"
        :title="item.title"
        :description="item.description"
      />
    </a-steps>
  </div>
</template>
<script>
export default {
  props: {
    record: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    //   debugger;
    return {
    //   current
    };
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    }
  }
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>