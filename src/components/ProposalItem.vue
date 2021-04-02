<template>
  <div class="content">
    <div class="proposal-info">
      <a class="title" target="_blank" :href="renderProposalUrl(proposal.authorIpfsHash)">{{ proposal.msg.payload.name }}</a>
      <p class="subtitle">
        {{$t('time')}}: {{ dateFormat(proposal.msg.payload.start) }} ~ {{ dateFormat(proposal.msg.payload.end) }}
      </p>
    </div>
    <div class="proposal-buttons hidden-sm-and-down">
      <el-button size="mini" @click="goVote(proposal.authorIpfsHash)">{{$t('vote')}}</el-button>
    </div>
  </div>
</template>

<script>
import { dateFormat, openUrl } from '@/helpers/utilities';
import { getApi, API_SNAPSHOT_DOMAIN } from '@/helpers/constants'
export default {
  name: "ProposalItem",
  props: {
    proposal: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    renderProposalUrl: function(hash) {
      return `${getApi(API_SNAPSHOT_DOMAIN).page}/#/evoland.eth/proposal/${hash}`;
    },
    goVote: function(hash) {
      openUrl(this.renderProposalUrl(hash));
    },
    dateFormat,
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.content {
  display: flex;
  align-items: center;
  padding: 20px;

  .proposal-info {
    min-width: 0;
    margin-right: 20px;
    flex: 1;
    p {
      margin: 0;
    }

    .title {
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 3px;
      color: $--color-text-primary;
      text-decoration: none;
    }

    .subtitle {
      font-size: 14px;
      color: $--color-subtitle;
    }
  }

  .proposal-buttons {
    flex-basis: 200px;
    display: flex;
    justify-content: flex-end;
    button {
      width: 100px;
    }
  }
}
</style>
