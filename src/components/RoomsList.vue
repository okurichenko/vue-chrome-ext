<template>
  <div class="rooms-list">
    <h3>Rooms list</h3>
    <hr>
    <div class="panel" v-for="room in rooms" @click="openLink(room['.key'])">
      <h4 v-text="room.title"></h4>
      <p><b>{{room.timeArranged | formattedDate}}</b> - {{room.place.name}}</p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'rooms-list',
    computed: {
      rooms () {
        const now = moment()
        return this.$store.state.rooms.filter((room) => {
          return now.isSameOrBefore(moment(room.timeArranged))
        })
      }
    },
    methods: {
      openLink(id) {
        window.open(`https://cooperate-for-food.firebaseapp.com/#/${id}`);
      }
    }
  }
</script>

<style lang="scss">
  .rooms-list {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 200px;
  }
  .panel {
    border: 1px solid #ccc;
    margin: 10px 0;
    background: #fff;
    transition: all .2s ease;

    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
</style>
