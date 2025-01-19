/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as AppBskyVideoUploadVideo from './types/app/bsky/video/uploadVideo'
import * as AppBskyVideoDefs from './types/app/bsky/video/defs'
import * as AppBskyVideoGetJobStatus from './types/app/bsky/video/getJobStatus'
import * as AppBskyVideoGetUploadLimits from './types/app/bsky/video/getUploadLimits'
import * as AppBskyEmbedDefs from './types/app/bsky/embed/defs'
import * as AppBskyEmbedRecord from './types/app/bsky/embed/record'
import * as AppBskyEmbedImages from './types/app/bsky/embed/images'
import * as AppBskyEmbedRecordWithMedia from './types/app/bsky/embed/recordWithMedia'
import * as AppBskyEmbedVideo from './types/app/bsky/embed/video'
import * as AppBskyEmbedExternal from './types/app/bsky/embed/external'
import * as AppBskyNotificationRegisterPush from './types/app/bsky/notification/registerPush'
import * as AppBskyNotificationPutPreferences from './types/app/bsky/notification/putPreferences'
import * as AppBskyNotificationUpdateSeen from './types/app/bsky/notification/updateSeen'
import * as AppBskyNotificationListNotifications from './types/app/bsky/notification/listNotifications'
import * as AppBskyNotificationGetUnreadCount from './types/app/bsky/notification/getUnreadCount'
import * as AppBskyUnspeccedSearchStarterPacksSkeleton from './types/app/bsky/unspecced/searchStarterPacksSkeleton'
import * as AppBskyUnspeccedDefs from './types/app/bsky/unspecced/defs'
import * as AppBskyUnspeccedSearchActorsSkeleton from './types/app/bsky/unspecced/searchActorsSkeleton'
import * as AppBskyUnspeccedGetSuggestionsSkeleton from './types/app/bsky/unspecced/getSuggestionsSkeleton'
import * as AppBskyUnspeccedSearchPostsSkeleton from './types/app/bsky/unspecced/searchPostsSkeleton'
import * as AppBskyUnspeccedGetPopularFeedGenerators from './types/app/bsky/unspecced/getPopularFeedGenerators'
import * as AppBskyUnspeccedGetTaggedSuggestions from './types/app/bsky/unspecced/getTaggedSuggestions'
import * as AppBskyUnspeccedGetConfig from './types/app/bsky/unspecced/getConfig'
import * as AppBskyGraphGetStarterPacks from './types/app/bsky/graph/getStarterPacks'
import * as AppBskyGraphGetSuggestedFollowsByActor from './types/app/bsky/graph/getSuggestedFollowsByActor'
import * as AppBskyGraphBlock from './types/app/bsky/graph/block'
import * as AppBskyGraphFollow from './types/app/bsky/graph/follow'
import * as AppBskyGraphDefs from './types/app/bsky/graph/defs'
import * as AppBskyGraphUnmuteActorList from './types/app/bsky/graph/unmuteActorList'
import * as AppBskyGraphGetListBlocks from './types/app/bsky/graph/getListBlocks'
import * as AppBskyGraphListblock from './types/app/bsky/graph/listblock'
import * as AppBskyGraphGetStarterPack from './types/app/bsky/graph/getStarterPack'
import * as AppBskyGraphStarterpack from './types/app/bsky/graph/starterpack'
import * as AppBskyGraphMuteActorList from './types/app/bsky/graph/muteActorList'
import * as AppBskyGraphMuteThread from './types/app/bsky/graph/muteThread'
import * as AppBskyGraphSearchStarterPacks from './types/app/bsky/graph/searchStarterPacks'
import * as AppBskyGraphGetActorStarterPacks from './types/app/bsky/graph/getActorStarterPacks'
import * as AppBskyGraphGetLists from './types/app/bsky/graph/getLists'
import * as AppBskyGraphGetFollowers from './types/app/bsky/graph/getFollowers'
import * as AppBskyGraphUnmuteThread from './types/app/bsky/graph/unmuteThread'
import * as AppBskyGraphMuteActor from './types/app/bsky/graph/muteActor'
import * as AppBskyGraphGetMutes from './types/app/bsky/graph/getMutes'
import * as AppBskyGraphListitem from './types/app/bsky/graph/listitem'
import * as AppBskyGraphList from './types/app/bsky/graph/list'
import * as AppBskyGraphGetKnownFollowers from './types/app/bsky/graph/getKnownFollowers'
import * as AppBskyGraphGetListMutes from './types/app/bsky/graph/getListMutes'
import * as AppBskyGraphGetFollows from './types/app/bsky/graph/getFollows'
import * as AppBskyGraphGetBlocks from './types/app/bsky/graph/getBlocks'
import * as AppBskyGraphGetRelationships from './types/app/bsky/graph/getRelationships'
import * as AppBskyGraphUnmuteActor from './types/app/bsky/graph/unmuteActor'
import * as AppBskyGraphGetList from './types/app/bsky/graph/getList'
import * as AppBskyFeedGenerator from './types/app/bsky/feed/generator'
import * as AppBskyFeedSendInteractions from './types/app/bsky/feed/sendInteractions'
import * as AppBskyFeedDefs from './types/app/bsky/feed/defs'
import * as AppBskyFeedGetFeedGenerators from './types/app/bsky/feed/getFeedGenerators'
import * as AppBskyFeedGetTimeline from './types/app/bsky/feed/getTimeline'
import * as AppBskyFeedGetFeedGenerator from './types/app/bsky/feed/getFeedGenerator'
import * as AppBskyFeedGetAuthorFeed from './types/app/bsky/feed/getAuthorFeed'
import * as AppBskyFeedGetLikes from './types/app/bsky/feed/getLikes'
import * as AppBskyFeedPostgate from './types/app/bsky/feed/postgate'
import * as AppBskyFeedThreadgate from './types/app/bsky/feed/threadgate'
import * as AppBskyFeedGetPostThread from './types/app/bsky/feed/getPostThread'
import * as AppBskyFeedGetActorLikes from './types/app/bsky/feed/getActorLikes'
import * as AppBskyFeedLike from './types/app/bsky/feed/like'
import * as AppBskyFeedGetRepostedBy from './types/app/bsky/feed/getRepostedBy'
import * as AppBskyFeedRepost from './types/app/bsky/feed/repost'
import * as AppBskyFeedDescribeFeedGenerator from './types/app/bsky/feed/describeFeedGenerator'
import * as AppBskyFeedSearchPosts from './types/app/bsky/feed/searchPosts'
import * as AppBskyFeedGetPosts from './types/app/bsky/feed/getPosts'
import * as AppBskyFeedGetFeed from './types/app/bsky/feed/getFeed'
import * as AppBskyFeedGetQuotes from './types/app/bsky/feed/getQuotes'
import * as AppBskyFeedGetFeedSkeleton from './types/app/bsky/feed/getFeedSkeleton'
import * as AppBskyFeedGetListFeed from './types/app/bsky/feed/getListFeed'
import * as AppBskyFeedGetSuggestedFeeds from './types/app/bsky/feed/getSuggestedFeeds'
import * as AppBskyFeedGetActorFeeds from './types/app/bsky/feed/getActorFeeds'
import * as AppBskyFeedPost from './types/app/bsky/feed/post'
import * as AppBskyRichtextFacet from './types/app/bsky/richtext/facet'
import * as AppBskyActorSearchActorsTypeahead from './types/app/bsky/actor/searchActorsTypeahead'
import * as AppBskyActorDefs from './types/app/bsky/actor/defs'
import * as AppBskyActorPutPreferences from './types/app/bsky/actor/putPreferences'
import * as AppBskyActorGetProfile from './types/app/bsky/actor/getProfile'
import * as AppBskyActorGetSuggestions from './types/app/bsky/actor/getSuggestions'
import * as AppBskyActorSearchActors from './types/app/bsky/actor/searchActors'
import * as AppBskyActorGetProfiles from './types/app/bsky/actor/getProfiles'
import * as AppBskyActorGetPreferences from './types/app/bsky/actor/getPreferences'
import * as AppBskyActorProfile from './types/app/bsky/actor/profile'
import * as AppBskyLabelerDefs from './types/app/bsky/labeler/defs'
import * as AppBskyLabelerService from './types/app/bsky/labeler/service'
import * as AppBskyLabelerGetServices from './types/app/bsky/labeler/getServices'
import * as BlueMarilStellarGetActorReactions from './types/blue/maril/stellar/getActorReactions'
import * as BlueMarilStellarGetReactions from './types/blue/maril/stellar/getReactions'
import * as BlueMarilStellarReaction from './types/blue/maril/stellar/reaction'
import * as BlueMojiCollectionItem from './types/blue/moji/collection/item'
import * as BlueMojiCollectionListCollection from './types/blue/moji/collection/listCollection'
import * as BlueMojiCollectionDefs from './types/blue/moji/collection/defs'
import * as BlueMojiCollectionPutItem from './types/blue/moji/collection/putItem'
import * as BlueMojiCollectionGetItem from './types/blue/moji/collection/getItem'
import * as BlueMojiCollectionSaveToCollection from './types/blue/moji/collection/saveToCollection'
import * as BlueMojiPacksPack from './types/blue/moji/packs/pack'
import * as BlueMojiPacksDefs from './types/blue/moji/packs/defs'
import * as BlueMojiPacksPackitem from './types/blue/moji/packs/packitem'
import * as BlueMojiPacksGetPack from './types/blue/moji/packs/getPack'
import * as BlueMojiPacksGetActorPacks from './types/blue/moji/packs/getActorPacks'
import * as BlueMojiPacksGetPacks from './types/blue/moji/packs/getPacks'
import * as BlueMojiRichtextFacet from './types/blue/moji/richtext/facet'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export * as AppBskyVideoUploadVideo from './types/app/bsky/video/uploadVideo'
export * as AppBskyVideoDefs from './types/app/bsky/video/defs'
export * as AppBskyVideoGetJobStatus from './types/app/bsky/video/getJobStatus'
export * as AppBskyVideoGetUploadLimits from './types/app/bsky/video/getUploadLimits'
export * as AppBskyEmbedDefs from './types/app/bsky/embed/defs'
export * as AppBskyEmbedRecord from './types/app/bsky/embed/record'
export * as AppBskyEmbedImages from './types/app/bsky/embed/images'
export * as AppBskyEmbedRecordWithMedia from './types/app/bsky/embed/recordWithMedia'
export * as AppBskyEmbedVideo from './types/app/bsky/embed/video'
export * as AppBskyEmbedExternal from './types/app/bsky/embed/external'
export * as AppBskyNotificationRegisterPush from './types/app/bsky/notification/registerPush'
export * as AppBskyNotificationPutPreferences from './types/app/bsky/notification/putPreferences'
export * as AppBskyNotificationUpdateSeen from './types/app/bsky/notification/updateSeen'
export * as AppBskyNotificationListNotifications from './types/app/bsky/notification/listNotifications'
export * as AppBskyNotificationGetUnreadCount from './types/app/bsky/notification/getUnreadCount'
export * as AppBskyUnspeccedSearchStarterPacksSkeleton from './types/app/bsky/unspecced/searchStarterPacksSkeleton'
export * as AppBskyUnspeccedDefs from './types/app/bsky/unspecced/defs'
export * as AppBskyUnspeccedSearchActorsSkeleton from './types/app/bsky/unspecced/searchActorsSkeleton'
export * as AppBskyUnspeccedGetSuggestionsSkeleton from './types/app/bsky/unspecced/getSuggestionsSkeleton'
export * as AppBskyUnspeccedSearchPostsSkeleton from './types/app/bsky/unspecced/searchPostsSkeleton'
export * as AppBskyUnspeccedGetPopularFeedGenerators from './types/app/bsky/unspecced/getPopularFeedGenerators'
export * as AppBskyUnspeccedGetTaggedSuggestions from './types/app/bsky/unspecced/getTaggedSuggestions'
export * as AppBskyUnspeccedGetConfig from './types/app/bsky/unspecced/getConfig'
export * as AppBskyGraphGetStarterPacks from './types/app/bsky/graph/getStarterPacks'
export * as AppBskyGraphGetSuggestedFollowsByActor from './types/app/bsky/graph/getSuggestedFollowsByActor'
export * as AppBskyGraphBlock from './types/app/bsky/graph/block'
export * as AppBskyGraphFollow from './types/app/bsky/graph/follow'
export * as AppBskyGraphDefs from './types/app/bsky/graph/defs'
export * as AppBskyGraphUnmuteActorList from './types/app/bsky/graph/unmuteActorList'
export * as AppBskyGraphGetListBlocks from './types/app/bsky/graph/getListBlocks'
export * as AppBskyGraphListblock from './types/app/bsky/graph/listblock'
export * as AppBskyGraphGetStarterPack from './types/app/bsky/graph/getStarterPack'
export * as AppBskyGraphStarterpack from './types/app/bsky/graph/starterpack'
export * as AppBskyGraphMuteActorList from './types/app/bsky/graph/muteActorList'
export * as AppBskyGraphMuteThread from './types/app/bsky/graph/muteThread'
export * as AppBskyGraphSearchStarterPacks from './types/app/bsky/graph/searchStarterPacks'
export * as AppBskyGraphGetActorStarterPacks from './types/app/bsky/graph/getActorStarterPacks'
export * as AppBskyGraphGetLists from './types/app/bsky/graph/getLists'
export * as AppBskyGraphGetFollowers from './types/app/bsky/graph/getFollowers'
export * as AppBskyGraphUnmuteThread from './types/app/bsky/graph/unmuteThread'
export * as AppBskyGraphMuteActor from './types/app/bsky/graph/muteActor'
export * as AppBskyGraphGetMutes from './types/app/bsky/graph/getMutes'
export * as AppBskyGraphListitem from './types/app/bsky/graph/listitem'
export * as AppBskyGraphList from './types/app/bsky/graph/list'
export * as AppBskyGraphGetKnownFollowers from './types/app/bsky/graph/getKnownFollowers'
export * as AppBskyGraphGetListMutes from './types/app/bsky/graph/getListMutes'
export * as AppBskyGraphGetFollows from './types/app/bsky/graph/getFollows'
export * as AppBskyGraphGetBlocks from './types/app/bsky/graph/getBlocks'
export * as AppBskyGraphGetRelationships from './types/app/bsky/graph/getRelationships'
export * as AppBskyGraphUnmuteActor from './types/app/bsky/graph/unmuteActor'
export * as AppBskyGraphGetList from './types/app/bsky/graph/getList'
export * as AppBskyFeedGenerator from './types/app/bsky/feed/generator'
export * as AppBskyFeedSendInteractions from './types/app/bsky/feed/sendInteractions'
export * as AppBskyFeedDefs from './types/app/bsky/feed/defs'
export * as AppBskyFeedGetFeedGenerators from './types/app/bsky/feed/getFeedGenerators'
export * as AppBskyFeedGetTimeline from './types/app/bsky/feed/getTimeline'
export * as AppBskyFeedGetFeedGenerator from './types/app/bsky/feed/getFeedGenerator'
export * as AppBskyFeedGetAuthorFeed from './types/app/bsky/feed/getAuthorFeed'
export * as AppBskyFeedGetLikes from './types/app/bsky/feed/getLikes'
export * as AppBskyFeedPostgate from './types/app/bsky/feed/postgate'
export * as AppBskyFeedThreadgate from './types/app/bsky/feed/threadgate'
export * as AppBskyFeedGetPostThread from './types/app/bsky/feed/getPostThread'
export * as AppBskyFeedGetActorLikes from './types/app/bsky/feed/getActorLikes'
export * as AppBskyFeedLike from './types/app/bsky/feed/like'
export * as AppBskyFeedGetRepostedBy from './types/app/bsky/feed/getRepostedBy'
export * as AppBskyFeedRepost from './types/app/bsky/feed/repost'
export * as AppBskyFeedDescribeFeedGenerator from './types/app/bsky/feed/describeFeedGenerator'
export * as AppBskyFeedSearchPosts from './types/app/bsky/feed/searchPosts'
export * as AppBskyFeedGetPosts from './types/app/bsky/feed/getPosts'
export * as AppBskyFeedGetFeed from './types/app/bsky/feed/getFeed'
export * as AppBskyFeedGetQuotes from './types/app/bsky/feed/getQuotes'
export * as AppBskyFeedGetFeedSkeleton from './types/app/bsky/feed/getFeedSkeleton'
export * as AppBskyFeedGetListFeed from './types/app/bsky/feed/getListFeed'
export * as AppBskyFeedGetSuggestedFeeds from './types/app/bsky/feed/getSuggestedFeeds'
export * as AppBskyFeedGetActorFeeds from './types/app/bsky/feed/getActorFeeds'
export * as AppBskyFeedPost from './types/app/bsky/feed/post'
export * as AppBskyRichtextFacet from './types/app/bsky/richtext/facet'
export * as AppBskyActorSearchActorsTypeahead from './types/app/bsky/actor/searchActorsTypeahead'
export * as AppBskyActorDefs from './types/app/bsky/actor/defs'
export * as AppBskyActorPutPreferences from './types/app/bsky/actor/putPreferences'
export * as AppBskyActorGetProfile from './types/app/bsky/actor/getProfile'
export * as AppBskyActorGetSuggestions from './types/app/bsky/actor/getSuggestions'
export * as AppBskyActorSearchActors from './types/app/bsky/actor/searchActors'
export * as AppBskyActorGetProfiles from './types/app/bsky/actor/getProfiles'
export * as AppBskyActorGetPreferences from './types/app/bsky/actor/getPreferences'
export * as AppBskyActorProfile from './types/app/bsky/actor/profile'
export * as AppBskyLabelerDefs from './types/app/bsky/labeler/defs'
export * as AppBskyLabelerService from './types/app/bsky/labeler/service'
export * as AppBskyLabelerGetServices from './types/app/bsky/labeler/getServices'
export * as BlueMarilStellarGetActorReactions from './types/blue/maril/stellar/getActorReactions'
export * as BlueMarilStellarGetReactions from './types/blue/maril/stellar/getReactions'
export * as BlueMarilStellarReaction from './types/blue/maril/stellar/reaction'
export * as BlueMojiCollectionItem from './types/blue/moji/collection/item'
export * as BlueMojiCollectionListCollection from './types/blue/moji/collection/listCollection'
export * as BlueMojiCollectionDefs from './types/blue/moji/collection/defs'
export * as BlueMojiCollectionPutItem from './types/blue/moji/collection/putItem'
export * as BlueMojiCollectionGetItem from './types/blue/moji/collection/getItem'
export * as BlueMojiCollectionSaveToCollection from './types/blue/moji/collection/saveToCollection'
export * as BlueMojiPacksPack from './types/blue/moji/packs/pack'
export * as BlueMojiPacksDefs from './types/blue/moji/packs/defs'
export * as BlueMojiPacksPackitem from './types/blue/moji/packs/packitem'
export * as BlueMojiPacksGetPack from './types/blue/moji/packs/getPack'
export * as BlueMojiPacksGetActorPacks from './types/blue/moji/packs/getActorPacks'
export * as BlueMojiPacksGetPacks from './types/blue/moji/packs/getPacks'
export * as BlueMojiRichtextFacet from './types/blue/moji/richtext/facet'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export const APP_BSKY_GRAPH = {
  DefsModlist: 'app.bsky.graph.defs#modlist',
  DefsCuratelist: 'app.bsky.graph.defs#curatelist',
  DefsReferencelist: 'app.bsky.graph.defs#referencelist',
}
export const APP_BSKY_FEED = {
  DefsRequestLess: 'app.bsky.feed.defs#requestLess',
  DefsRequestMore: 'app.bsky.feed.defs#requestMore',
  DefsClickthroughItem: 'app.bsky.feed.defs#clickthroughItem',
  DefsClickthroughAuthor: 'app.bsky.feed.defs#clickthroughAuthor',
  DefsClickthroughReposter: 'app.bsky.feed.defs#clickthroughReposter',
  DefsClickthroughEmbed: 'app.bsky.feed.defs#clickthroughEmbed',
  DefsInteractionSeen: 'app.bsky.feed.defs#interactionSeen',
  DefsInteractionLike: 'app.bsky.feed.defs#interactionLike',
  DefsInteractionRepost: 'app.bsky.feed.defs#interactionRepost',
  DefsInteractionReply: 'app.bsky.feed.defs#interactionReply',
  DefsInteractionQuote: 'app.bsky.feed.defs#interactionQuote',
  DefsInteractionShare: 'app.bsky.feed.defs#interactionShare',
}

export class AtpBaseClient extends XrpcClient {
  app: AppNS
  blue: BlueNS
  com: ComNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.app = new AppNS(this)
    this.blue = new BlueNS(this)
    this.com = new ComNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class AppNS {
  _client: XrpcClient
  bsky: AppBskyNS

  constructor(client: XrpcClient) {
    this._client = client
    this.bsky = new AppBskyNS(client)
  }
}

export class AppBskyNS {
  _client: XrpcClient
  video: AppBskyVideoNS
  embed: AppBskyEmbedNS
  notification: AppBskyNotificationNS
  unspecced: AppBskyUnspeccedNS
  graph: AppBskyGraphNS
  feed: AppBskyFeedNS
  richtext: AppBskyRichtextNS
  actor: AppBskyActorNS
  labeler: AppBskyLabelerNS

  constructor(client: XrpcClient) {
    this._client = client
    this.video = new AppBskyVideoNS(client)
    this.embed = new AppBskyEmbedNS(client)
    this.notification = new AppBskyNotificationNS(client)
    this.unspecced = new AppBskyUnspeccedNS(client)
    this.graph = new AppBskyGraphNS(client)
    this.feed = new AppBskyFeedNS(client)
    this.richtext = new AppBskyRichtextNS(client)
    this.actor = new AppBskyActorNS(client)
    this.labeler = new AppBskyLabelerNS(client)
  }
}

export class AppBskyVideoNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  uploadVideo(
    data?: AppBskyVideoUploadVideo.InputSchema,
    opts?: AppBskyVideoUploadVideo.CallOptions,
  ): Promise<AppBskyVideoUploadVideo.Response> {
    return this._client.call('app.bsky.video.uploadVideo', opts?.qp, data, opts)
  }

  getJobStatus(
    params?: AppBskyVideoGetJobStatus.QueryParams,
    opts?: AppBskyVideoGetJobStatus.CallOptions,
  ): Promise<AppBskyVideoGetJobStatus.Response> {
    return this._client.call(
      'app.bsky.video.getJobStatus',
      params,
      undefined,
      opts,
    )
  }

  getUploadLimits(
    params?: AppBskyVideoGetUploadLimits.QueryParams,
    opts?: AppBskyVideoGetUploadLimits.CallOptions,
  ): Promise<AppBskyVideoGetUploadLimits.Response> {
    return this._client.call(
      'app.bsky.video.getUploadLimits',
      params,
      undefined,
      opts,
    )
  }
}

export class AppBskyEmbedNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}

export class AppBskyNotificationNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  registerPush(
    data?: AppBskyNotificationRegisterPush.InputSchema,
    opts?: AppBskyNotificationRegisterPush.CallOptions,
  ): Promise<AppBskyNotificationRegisterPush.Response> {
    return this._client.call(
      'app.bsky.notification.registerPush',
      opts?.qp,
      data,
      opts,
    )
  }

  putPreferences(
    data?: AppBskyNotificationPutPreferences.InputSchema,
    opts?: AppBskyNotificationPutPreferences.CallOptions,
  ): Promise<AppBskyNotificationPutPreferences.Response> {
    return this._client.call(
      'app.bsky.notification.putPreferences',
      opts?.qp,
      data,
      opts,
    )
  }

  updateSeen(
    data?: AppBskyNotificationUpdateSeen.InputSchema,
    opts?: AppBskyNotificationUpdateSeen.CallOptions,
  ): Promise<AppBskyNotificationUpdateSeen.Response> {
    return this._client.call(
      'app.bsky.notification.updateSeen',
      opts?.qp,
      data,
      opts,
    )
  }

  listNotifications(
    params?: AppBskyNotificationListNotifications.QueryParams,
    opts?: AppBskyNotificationListNotifications.CallOptions,
  ): Promise<AppBskyNotificationListNotifications.Response> {
    return this._client.call(
      'app.bsky.notification.listNotifications',
      params,
      undefined,
      opts,
    )
  }

  getUnreadCount(
    params?: AppBskyNotificationGetUnreadCount.QueryParams,
    opts?: AppBskyNotificationGetUnreadCount.CallOptions,
  ): Promise<AppBskyNotificationGetUnreadCount.Response> {
    return this._client.call(
      'app.bsky.notification.getUnreadCount',
      params,
      undefined,
      opts,
    )
  }
}

export class AppBskyUnspeccedNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  searchStarterPacksSkeleton(
    params?: AppBskyUnspeccedSearchStarterPacksSkeleton.QueryParams,
    opts?: AppBskyUnspeccedSearchStarterPacksSkeleton.CallOptions,
  ): Promise<AppBskyUnspeccedSearchStarterPacksSkeleton.Response> {
    return this._client
      .call(
        'app.bsky.unspecced.searchStarterPacksSkeleton',
        params,
        undefined,
        opts,
      )
      .catch((e) => {
        throw AppBskyUnspeccedSearchStarterPacksSkeleton.toKnownErr(e)
      })
  }

  searchActorsSkeleton(
    params?: AppBskyUnspeccedSearchActorsSkeleton.QueryParams,
    opts?: AppBskyUnspeccedSearchActorsSkeleton.CallOptions,
  ): Promise<AppBskyUnspeccedSearchActorsSkeleton.Response> {
    return this._client
      .call('app.bsky.unspecced.searchActorsSkeleton', params, undefined, opts)
      .catch((e) => {
        throw AppBskyUnspeccedSearchActorsSkeleton.toKnownErr(e)
      })
  }

  getSuggestionsSkeleton(
    params?: AppBskyUnspeccedGetSuggestionsSkeleton.QueryParams,
    opts?: AppBskyUnspeccedGetSuggestionsSkeleton.CallOptions,
  ): Promise<AppBskyUnspeccedGetSuggestionsSkeleton.Response> {
    return this._client.call(
      'app.bsky.unspecced.getSuggestionsSkeleton',
      params,
      undefined,
      opts,
    )
  }

  searchPostsSkeleton(
    params?: AppBskyUnspeccedSearchPostsSkeleton.QueryParams,
    opts?: AppBskyUnspeccedSearchPostsSkeleton.CallOptions,
  ): Promise<AppBskyUnspeccedSearchPostsSkeleton.Response> {
    return this._client
      .call('app.bsky.unspecced.searchPostsSkeleton', params, undefined, opts)
      .catch((e) => {
        throw AppBskyUnspeccedSearchPostsSkeleton.toKnownErr(e)
      })
  }

  getPopularFeedGenerators(
    params?: AppBskyUnspeccedGetPopularFeedGenerators.QueryParams,
    opts?: AppBskyUnspeccedGetPopularFeedGenerators.CallOptions,
  ): Promise<AppBskyUnspeccedGetPopularFeedGenerators.Response> {
    return this._client.call(
      'app.bsky.unspecced.getPopularFeedGenerators',
      params,
      undefined,
      opts,
    )
  }

  getTaggedSuggestions(
    params?: AppBskyUnspeccedGetTaggedSuggestions.QueryParams,
    opts?: AppBskyUnspeccedGetTaggedSuggestions.CallOptions,
  ): Promise<AppBskyUnspeccedGetTaggedSuggestions.Response> {
    return this._client.call(
      'app.bsky.unspecced.getTaggedSuggestions',
      params,
      undefined,
      opts,
    )
  }

  getConfig(
    params?: AppBskyUnspeccedGetConfig.QueryParams,
    opts?: AppBskyUnspeccedGetConfig.CallOptions,
  ): Promise<AppBskyUnspeccedGetConfig.Response> {
    return this._client.call(
      'app.bsky.unspecced.getConfig',
      params,
      undefined,
      opts,
    )
  }
}

export class AppBskyGraphNS {
  _client: XrpcClient
  block: BlockRecord
  follow: FollowRecord
  listblock: ListblockRecord
  starterpack: StarterpackRecord
  listitem: ListitemRecord
  list: ListRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.block = new BlockRecord(client)
    this.follow = new FollowRecord(client)
    this.listblock = new ListblockRecord(client)
    this.starterpack = new StarterpackRecord(client)
    this.listitem = new ListitemRecord(client)
    this.list = new ListRecord(client)
  }

  getStarterPacks(
    params?: AppBskyGraphGetStarterPacks.QueryParams,
    opts?: AppBskyGraphGetStarterPacks.CallOptions,
  ): Promise<AppBskyGraphGetStarterPacks.Response> {
    return this._client.call(
      'app.bsky.graph.getStarterPacks',
      params,
      undefined,
      opts,
    )
  }

  getSuggestedFollowsByActor(
    params?: AppBskyGraphGetSuggestedFollowsByActor.QueryParams,
    opts?: AppBskyGraphGetSuggestedFollowsByActor.CallOptions,
  ): Promise<AppBskyGraphGetSuggestedFollowsByActor.Response> {
    return this._client.call(
      'app.bsky.graph.getSuggestedFollowsByActor',
      params,
      undefined,
      opts,
    )
  }

  unmuteActorList(
    data?: AppBskyGraphUnmuteActorList.InputSchema,
    opts?: AppBskyGraphUnmuteActorList.CallOptions,
  ): Promise<AppBskyGraphUnmuteActorList.Response> {
    return this._client.call(
      'app.bsky.graph.unmuteActorList',
      opts?.qp,
      data,
      opts,
    )
  }

  getListBlocks(
    params?: AppBskyGraphGetListBlocks.QueryParams,
    opts?: AppBskyGraphGetListBlocks.CallOptions,
  ): Promise<AppBskyGraphGetListBlocks.Response> {
    return this._client.call(
      'app.bsky.graph.getListBlocks',
      params,
      undefined,
      opts,
    )
  }

  getStarterPack(
    params?: AppBskyGraphGetStarterPack.QueryParams,
    opts?: AppBskyGraphGetStarterPack.CallOptions,
  ): Promise<AppBskyGraphGetStarterPack.Response> {
    return this._client.call(
      'app.bsky.graph.getStarterPack',
      params,
      undefined,
      opts,
    )
  }

  muteActorList(
    data?: AppBskyGraphMuteActorList.InputSchema,
    opts?: AppBskyGraphMuteActorList.CallOptions,
  ): Promise<AppBskyGraphMuteActorList.Response> {
    return this._client.call(
      'app.bsky.graph.muteActorList',
      opts?.qp,
      data,
      opts,
    )
  }

  muteThread(
    data?: AppBskyGraphMuteThread.InputSchema,
    opts?: AppBskyGraphMuteThread.CallOptions,
  ): Promise<AppBskyGraphMuteThread.Response> {
    return this._client.call('app.bsky.graph.muteThread', opts?.qp, data, opts)
  }

  searchStarterPacks(
    params?: AppBskyGraphSearchStarterPacks.QueryParams,
    opts?: AppBskyGraphSearchStarterPacks.CallOptions,
  ): Promise<AppBskyGraphSearchStarterPacks.Response> {
    return this._client.call(
      'app.bsky.graph.searchStarterPacks',
      params,
      undefined,
      opts,
    )
  }

  getActorStarterPacks(
    params?: AppBskyGraphGetActorStarterPacks.QueryParams,
    opts?: AppBskyGraphGetActorStarterPacks.CallOptions,
  ): Promise<AppBskyGraphGetActorStarterPacks.Response> {
    return this._client.call(
      'app.bsky.graph.getActorStarterPacks',
      params,
      undefined,
      opts,
    )
  }

  getLists(
    params?: AppBskyGraphGetLists.QueryParams,
    opts?: AppBskyGraphGetLists.CallOptions,
  ): Promise<AppBskyGraphGetLists.Response> {
    return this._client.call('app.bsky.graph.getLists', params, undefined, opts)
  }

  getFollowers(
    params?: AppBskyGraphGetFollowers.QueryParams,
    opts?: AppBskyGraphGetFollowers.CallOptions,
  ): Promise<AppBskyGraphGetFollowers.Response> {
    return this._client.call(
      'app.bsky.graph.getFollowers',
      params,
      undefined,
      opts,
    )
  }

  unmuteThread(
    data?: AppBskyGraphUnmuteThread.InputSchema,
    opts?: AppBskyGraphUnmuteThread.CallOptions,
  ): Promise<AppBskyGraphUnmuteThread.Response> {
    return this._client.call(
      'app.bsky.graph.unmuteThread',
      opts?.qp,
      data,
      opts,
    )
  }

  muteActor(
    data?: AppBskyGraphMuteActor.InputSchema,
    opts?: AppBskyGraphMuteActor.CallOptions,
  ): Promise<AppBskyGraphMuteActor.Response> {
    return this._client.call('app.bsky.graph.muteActor', opts?.qp, data, opts)
  }

  getMutes(
    params?: AppBskyGraphGetMutes.QueryParams,
    opts?: AppBskyGraphGetMutes.CallOptions,
  ): Promise<AppBskyGraphGetMutes.Response> {
    return this._client.call('app.bsky.graph.getMutes', params, undefined, opts)
  }

  getKnownFollowers(
    params?: AppBskyGraphGetKnownFollowers.QueryParams,
    opts?: AppBskyGraphGetKnownFollowers.CallOptions,
  ): Promise<AppBskyGraphGetKnownFollowers.Response> {
    return this._client.call(
      'app.bsky.graph.getKnownFollowers',
      params,
      undefined,
      opts,
    )
  }

  getListMutes(
    params?: AppBskyGraphGetListMutes.QueryParams,
    opts?: AppBskyGraphGetListMutes.CallOptions,
  ): Promise<AppBskyGraphGetListMutes.Response> {
    return this._client.call(
      'app.bsky.graph.getListMutes',
      params,
      undefined,
      opts,
    )
  }

  getFollows(
    params?: AppBskyGraphGetFollows.QueryParams,
    opts?: AppBskyGraphGetFollows.CallOptions,
  ): Promise<AppBskyGraphGetFollows.Response> {
    return this._client.call(
      'app.bsky.graph.getFollows',
      params,
      undefined,
      opts,
    )
  }

  getBlocks(
    params?: AppBskyGraphGetBlocks.QueryParams,
    opts?: AppBskyGraphGetBlocks.CallOptions,
  ): Promise<AppBskyGraphGetBlocks.Response> {
    return this._client.call(
      'app.bsky.graph.getBlocks',
      params,
      undefined,
      opts,
    )
  }

  getRelationships(
    params?: AppBskyGraphGetRelationships.QueryParams,
    opts?: AppBskyGraphGetRelationships.CallOptions,
  ): Promise<AppBskyGraphGetRelationships.Response> {
    return this._client
      .call('app.bsky.graph.getRelationships', params, undefined, opts)
      .catch((e) => {
        throw AppBskyGraphGetRelationships.toKnownErr(e)
      })
  }

  unmuteActor(
    data?: AppBskyGraphUnmuteActor.InputSchema,
    opts?: AppBskyGraphUnmuteActor.CallOptions,
  ): Promise<AppBskyGraphUnmuteActor.Response> {
    return this._client.call('app.bsky.graph.unmuteActor', opts?.qp, data, opts)
  }

  getList(
    params?: AppBskyGraphGetList.QueryParams,
    opts?: AppBskyGraphGetList.CallOptions,
  ): Promise<AppBskyGraphGetList.Response> {
    return this._client.call('app.bsky.graph.getList', params, undefined, opts)
  }
}

export class BlockRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyGraphBlock.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.graph.block',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyGraphBlock.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.graph.block',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyGraphBlock.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.graph.block'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.graph.block', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.graph.block', ...params },
      { headers },
    )
  }
}

export class FollowRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyGraphFollow.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.graph.follow',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyGraphFollow.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.graph.follow',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyGraphFollow.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.graph.follow'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.graph.follow', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.graph.follow', ...params },
      { headers },
    )
  }
}

export class ListblockRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyGraphListblock.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.graph.listblock',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppBskyGraphListblock.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.graph.listblock',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyGraphListblock.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.graph.listblock'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.graph.listblock', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.graph.listblock', ...params },
      { headers },
    )
  }
}

export class StarterpackRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyGraphStarterpack.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.graph.starterpack',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppBskyGraphStarterpack.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.graph.starterpack',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyGraphStarterpack.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.graph.starterpack'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.graph.starterpack', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.graph.starterpack', ...params },
      { headers },
    )
  }
}

export class ListitemRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyGraphListitem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.graph.listitem',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyGraphListitem.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.graph.listitem',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyGraphListitem.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.graph.listitem'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.graph.listitem', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.graph.listitem', ...params },
      { headers },
    )
  }
}

export class ListRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyGraphList.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.graph.list',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyGraphList.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.graph.list',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyGraphList.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.graph.list'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.graph.list', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.graph.list', ...params },
      { headers },
    )
  }
}

export class AppBskyFeedNS {
  _client: XrpcClient
  generator: GeneratorRecord
  postgate: PostgateRecord
  threadgate: ThreadgateRecord
  like: LikeRecord
  repost: RepostRecord
  post: PostRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.generator = new GeneratorRecord(client)
    this.postgate = new PostgateRecord(client)
    this.threadgate = new ThreadgateRecord(client)
    this.like = new LikeRecord(client)
    this.repost = new RepostRecord(client)
    this.post = new PostRecord(client)
  }

  sendInteractions(
    data?: AppBskyFeedSendInteractions.InputSchema,
    opts?: AppBskyFeedSendInteractions.CallOptions,
  ): Promise<AppBskyFeedSendInteractions.Response> {
    return this._client.call(
      'app.bsky.feed.sendInteractions',
      opts?.qp,
      data,
      opts,
    )
  }

  getFeedGenerators(
    params?: AppBskyFeedGetFeedGenerators.QueryParams,
    opts?: AppBskyFeedGetFeedGenerators.CallOptions,
  ): Promise<AppBskyFeedGetFeedGenerators.Response> {
    return this._client.call(
      'app.bsky.feed.getFeedGenerators',
      params,
      undefined,
      opts,
    )
  }

  getTimeline(
    params?: AppBskyFeedGetTimeline.QueryParams,
    opts?: AppBskyFeedGetTimeline.CallOptions,
  ): Promise<AppBskyFeedGetTimeline.Response> {
    return this._client.call(
      'app.bsky.feed.getTimeline',
      params,
      undefined,
      opts,
    )
  }

  getFeedGenerator(
    params?: AppBskyFeedGetFeedGenerator.QueryParams,
    opts?: AppBskyFeedGetFeedGenerator.CallOptions,
  ): Promise<AppBskyFeedGetFeedGenerator.Response> {
    return this._client.call(
      'app.bsky.feed.getFeedGenerator',
      params,
      undefined,
      opts,
    )
  }

  getAuthorFeed(
    params?: AppBskyFeedGetAuthorFeed.QueryParams,
    opts?: AppBskyFeedGetAuthorFeed.CallOptions,
  ): Promise<AppBskyFeedGetAuthorFeed.Response> {
    return this._client
      .call('app.bsky.feed.getAuthorFeed', params, undefined, opts)
      .catch((e) => {
        throw AppBskyFeedGetAuthorFeed.toKnownErr(e)
      })
  }

  getLikes(
    params?: AppBskyFeedGetLikes.QueryParams,
    opts?: AppBskyFeedGetLikes.CallOptions,
  ): Promise<AppBskyFeedGetLikes.Response> {
    return this._client.call('app.bsky.feed.getLikes', params, undefined, opts)
  }

  getPostThread(
    params?: AppBskyFeedGetPostThread.QueryParams,
    opts?: AppBskyFeedGetPostThread.CallOptions,
  ): Promise<AppBskyFeedGetPostThread.Response> {
    return this._client
      .call('app.bsky.feed.getPostThread', params, undefined, opts)
      .catch((e) => {
        throw AppBskyFeedGetPostThread.toKnownErr(e)
      })
  }

  getActorLikes(
    params?: AppBskyFeedGetActorLikes.QueryParams,
    opts?: AppBskyFeedGetActorLikes.CallOptions,
  ): Promise<AppBskyFeedGetActorLikes.Response> {
    return this._client
      .call('app.bsky.feed.getActorLikes', params, undefined, opts)
      .catch((e) => {
        throw AppBskyFeedGetActorLikes.toKnownErr(e)
      })
  }

  getRepostedBy(
    params?: AppBskyFeedGetRepostedBy.QueryParams,
    opts?: AppBskyFeedGetRepostedBy.CallOptions,
  ): Promise<AppBskyFeedGetRepostedBy.Response> {
    return this._client.call(
      'app.bsky.feed.getRepostedBy',
      params,
      undefined,
      opts,
    )
  }

  describeFeedGenerator(
    params?: AppBskyFeedDescribeFeedGenerator.QueryParams,
    opts?: AppBskyFeedDescribeFeedGenerator.CallOptions,
  ): Promise<AppBskyFeedDescribeFeedGenerator.Response> {
    return this._client.call(
      'app.bsky.feed.describeFeedGenerator',
      params,
      undefined,
      opts,
    )
  }

  searchPosts(
    params?: AppBskyFeedSearchPosts.QueryParams,
    opts?: AppBskyFeedSearchPosts.CallOptions,
  ): Promise<AppBskyFeedSearchPosts.Response> {
    return this._client
      .call('app.bsky.feed.searchPosts', params, undefined, opts)
      .catch((e) => {
        throw AppBskyFeedSearchPosts.toKnownErr(e)
      })
  }

  getPosts(
    params?: AppBskyFeedGetPosts.QueryParams,
    opts?: AppBskyFeedGetPosts.CallOptions,
  ): Promise<AppBskyFeedGetPosts.Response> {
    return this._client.call('app.bsky.feed.getPosts', params, undefined, opts)
  }

  getFeed(
    params?: AppBskyFeedGetFeed.QueryParams,
    opts?: AppBskyFeedGetFeed.CallOptions,
  ): Promise<AppBskyFeedGetFeed.Response> {
    return this._client
      .call('app.bsky.feed.getFeed', params, undefined, opts)
      .catch((e) => {
        throw AppBskyFeedGetFeed.toKnownErr(e)
      })
  }

  getQuotes(
    params?: AppBskyFeedGetQuotes.QueryParams,
    opts?: AppBskyFeedGetQuotes.CallOptions,
  ): Promise<AppBskyFeedGetQuotes.Response> {
    return this._client.call('app.bsky.feed.getQuotes', params, undefined, opts)
  }

  getFeedSkeleton(
    params?: AppBskyFeedGetFeedSkeleton.QueryParams,
    opts?: AppBskyFeedGetFeedSkeleton.CallOptions,
  ): Promise<AppBskyFeedGetFeedSkeleton.Response> {
    return this._client
      .call('app.bsky.feed.getFeedSkeleton', params, undefined, opts)
      .catch((e) => {
        throw AppBskyFeedGetFeedSkeleton.toKnownErr(e)
      })
  }

  getListFeed(
    params?: AppBskyFeedGetListFeed.QueryParams,
    opts?: AppBskyFeedGetListFeed.CallOptions,
  ): Promise<AppBskyFeedGetListFeed.Response> {
    return this._client
      .call('app.bsky.feed.getListFeed', params, undefined, opts)
      .catch((e) => {
        throw AppBskyFeedGetListFeed.toKnownErr(e)
      })
  }

  getSuggestedFeeds(
    params?: AppBskyFeedGetSuggestedFeeds.QueryParams,
    opts?: AppBskyFeedGetSuggestedFeeds.CallOptions,
  ): Promise<AppBskyFeedGetSuggestedFeeds.Response> {
    return this._client.call(
      'app.bsky.feed.getSuggestedFeeds',
      params,
      undefined,
      opts,
    )
  }

  getActorFeeds(
    params?: AppBskyFeedGetActorFeeds.QueryParams,
    opts?: AppBskyFeedGetActorFeeds.CallOptions,
  ): Promise<AppBskyFeedGetActorFeeds.Response> {
    return this._client.call(
      'app.bsky.feed.getActorFeeds',
      params,
      undefined,
      opts,
    )
  }
}

export class GeneratorRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyFeedGenerator.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.feed.generator',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyFeedGenerator.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.feed.generator',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyFeedGenerator.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.feed.generator'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.feed.generator', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.feed.generator', ...params },
      { headers },
    )
  }
}

export class PostgateRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyFeedPostgate.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.feed.postgate',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyFeedPostgate.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.feed.postgate',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyFeedPostgate.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.feed.postgate'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.feed.postgate', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.feed.postgate', ...params },
      { headers },
    )
  }
}

export class ThreadgateRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyFeedThreadgate.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.feed.threadgate',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppBskyFeedThreadgate.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.feed.threadgate',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyFeedThreadgate.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.feed.threadgate'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.feed.threadgate', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.feed.threadgate', ...params },
      { headers },
    )
  }
}

export class LikeRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyFeedLike.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.feed.like',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyFeedLike.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.feed.like',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyFeedLike.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.feed.like'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.feed.like', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.feed.like', ...params },
      { headers },
    )
  }
}

export class RepostRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyFeedRepost.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.feed.repost',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyFeedRepost.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.feed.repost',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyFeedRepost.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.feed.repost'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.feed.repost', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.feed.repost', ...params },
      { headers },
    )
  }
}

export class PostRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyFeedPost.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.feed.post',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyFeedPost.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.feed.post',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyFeedPost.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.feed.post'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.feed.post', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.feed.post', ...params },
      { headers },
    )
  }
}

export class AppBskyRichtextNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}

export class AppBskyActorNS {
  _client: XrpcClient
  profile: ProfileRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.profile = new ProfileRecord(client)
  }

  searchActorsTypeahead(
    params?: AppBskyActorSearchActorsTypeahead.QueryParams,
    opts?: AppBskyActorSearchActorsTypeahead.CallOptions,
  ): Promise<AppBskyActorSearchActorsTypeahead.Response> {
    return this._client.call(
      'app.bsky.actor.searchActorsTypeahead',
      params,
      undefined,
      opts,
    )
  }

  putPreferences(
    data?: AppBskyActorPutPreferences.InputSchema,
    opts?: AppBskyActorPutPreferences.CallOptions,
  ): Promise<AppBskyActorPutPreferences.Response> {
    return this._client.call(
      'app.bsky.actor.putPreferences',
      opts?.qp,
      data,
      opts,
    )
  }

  getProfile(
    params?: AppBskyActorGetProfile.QueryParams,
    opts?: AppBskyActorGetProfile.CallOptions,
  ): Promise<AppBskyActorGetProfile.Response> {
    return this._client.call(
      'app.bsky.actor.getProfile',
      params,
      undefined,
      opts,
    )
  }

  getSuggestions(
    params?: AppBskyActorGetSuggestions.QueryParams,
    opts?: AppBskyActorGetSuggestions.CallOptions,
  ): Promise<AppBskyActorGetSuggestions.Response> {
    return this._client.call(
      'app.bsky.actor.getSuggestions',
      params,
      undefined,
      opts,
    )
  }

  searchActors(
    params?: AppBskyActorSearchActors.QueryParams,
    opts?: AppBskyActorSearchActors.CallOptions,
  ): Promise<AppBskyActorSearchActors.Response> {
    return this._client.call(
      'app.bsky.actor.searchActors',
      params,
      undefined,
      opts,
    )
  }

  getProfiles(
    params?: AppBskyActorGetProfiles.QueryParams,
    opts?: AppBskyActorGetProfiles.CallOptions,
  ): Promise<AppBskyActorGetProfiles.Response> {
    return this._client.call(
      'app.bsky.actor.getProfiles',
      params,
      undefined,
      opts,
    )
  }

  getPreferences(
    params?: AppBskyActorGetPreferences.QueryParams,
    opts?: AppBskyActorGetPreferences.CallOptions,
  ): Promise<AppBskyActorGetPreferences.Response> {
    return this._client.call(
      'app.bsky.actor.getPreferences',
      params,
      undefined,
      opts,
    )
  }
}

export class ProfileRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyActorProfile.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.actor.profile',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppBskyActorProfile.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.actor.profile',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyActorProfile.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.actor.profile'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.bsky.actor.profile', rkey: 'self', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.actor.profile', ...params },
      { headers },
    )
  }
}

export class AppBskyLabelerNS {
  _client: XrpcClient
  service: ServiceRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.service = new ServiceRecord(client)
  }

  getServices(
    params?: AppBskyLabelerGetServices.QueryParams,
    opts?: AppBskyLabelerGetServices.CallOptions,
  ): Promise<AppBskyLabelerGetServices.Response> {
    return this._client.call(
      'app.bsky.labeler.getServices',
      params,
      undefined,
      opts,
    )
  }
}

export class ServiceRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppBskyLabelerService.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.bsky.labeler.service',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppBskyLabelerService.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.bsky.labeler.service',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppBskyLabelerService.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.bsky.labeler.service'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection: 'app.bsky.labeler.service',
        rkey: 'self',
        ...params,
        record,
      },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.bsky.labeler.service', ...params },
      { headers },
    )
  }
}

export class BlueNS {
  _client: XrpcClient
  maril: BlueMarilNS
  moji: BlueMojiNS

  constructor(client: XrpcClient) {
    this._client = client
    this.maril = new BlueMarilNS(client)
    this.moji = new BlueMojiNS(client)
  }
}

export class BlueMarilNS {
  _client: XrpcClient
  stellar: BlueMarilStellarNS

  constructor(client: XrpcClient) {
    this._client = client
    this.stellar = new BlueMarilStellarNS(client)
  }
}

export class BlueMarilStellarNS {
  _client: XrpcClient
  reaction: ReactionRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.reaction = new ReactionRecord(client)
  }

  getActorReactions(
    params?: BlueMarilStellarGetActorReactions.QueryParams,
    opts?: BlueMarilStellarGetActorReactions.CallOptions,
  ): Promise<BlueMarilStellarGetActorReactions.Response> {
    return this._client.call(
      'blue.maril.stellar.getActorReactions',
      params,
      undefined,
      opts,
    )
  }

  getReactions(
    params?: BlueMarilStellarGetReactions.QueryParams,
    opts?: BlueMarilStellarGetReactions.CallOptions,
  ): Promise<BlueMarilStellarGetReactions.Response> {
    return this._client.call(
      'blue.maril.stellar.getReactions',
      params,
      undefined,
      opts,
    )
  }
}

export class ReactionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueMarilStellarReaction.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.maril.stellar.reaction',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: BlueMarilStellarReaction.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.maril.stellar.reaction',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueMarilStellarReaction.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.maril.stellar.reaction'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.maril.stellar.reaction', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'blue.maril.stellar.reaction', ...params },
      { headers },
    )
  }
}

export class BlueMojiNS {
  _client: XrpcClient
  collection: BlueMojiCollectionNS
  packs: BlueMojiPacksNS
  richtext: BlueMojiRichtextNS

  constructor(client: XrpcClient) {
    this._client = client
    this.collection = new BlueMojiCollectionNS(client)
    this.packs = new BlueMojiPacksNS(client)
    this.richtext = new BlueMojiRichtextNS(client)
  }
}

export class BlueMojiCollectionNS {
  _client: XrpcClient
  item: ItemRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.item = new ItemRecord(client)
  }

  listCollection(
    params?: BlueMojiCollectionListCollection.QueryParams,
    opts?: BlueMojiCollectionListCollection.CallOptions,
  ): Promise<BlueMojiCollectionListCollection.Response> {
    return this._client.call(
      'blue.moji.collection.listCollection',
      params,
      undefined,
      opts,
    )
  }

  putItem(
    data?: BlueMojiCollectionPutItem.InputSchema,
    opts?: BlueMojiCollectionPutItem.CallOptions,
  ): Promise<BlueMojiCollectionPutItem.Response> {
    return this._client.call(
      'blue.moji.collection.putItem',
      opts?.qp,
      data,
      opts,
    )
  }

  getItem(
    params?: BlueMojiCollectionGetItem.QueryParams,
    opts?: BlueMojiCollectionGetItem.CallOptions,
  ): Promise<BlueMojiCollectionGetItem.Response> {
    return this._client.call(
      'blue.moji.collection.getItem',
      params,
      undefined,
      opts,
    )
  }

  saveToCollection(
    data?: BlueMojiCollectionSaveToCollection.InputSchema,
    opts?: BlueMojiCollectionSaveToCollection.CallOptions,
  ): Promise<BlueMojiCollectionSaveToCollection.Response> {
    return this._client
      .call('blue.moji.collection.saveToCollection', opts?.qp, data, opts)
      .catch((e) => {
        throw BlueMojiCollectionSaveToCollection.toKnownErr(e)
      })
  }
}

export class ItemRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueMojiCollectionItem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.moji.collection.item',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: BlueMojiCollectionItem.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.moji.collection.item',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueMojiCollectionItem.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.moji.collection.item'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.moji.collection.item', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'blue.moji.collection.item', ...params },
      { headers },
    )
  }
}

export class BlueMojiPacksNS {
  _client: XrpcClient
  pack: PackRecord
  packitem: PackitemRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.pack = new PackRecord(client)
    this.packitem = new PackitemRecord(client)
  }

  getPack(
    params?: BlueMojiPacksGetPack.QueryParams,
    opts?: BlueMojiPacksGetPack.CallOptions,
  ): Promise<BlueMojiPacksGetPack.Response> {
    return this._client.call('blue.moji.packs.getPack', params, undefined, opts)
  }

  getActorPacks(
    params?: BlueMojiPacksGetActorPacks.QueryParams,
    opts?: BlueMojiPacksGetActorPacks.CallOptions,
  ): Promise<BlueMojiPacksGetActorPacks.Response> {
    return this._client.call(
      'blue.moji.packs.getActorPacks',
      params,
      undefined,
      opts,
    )
  }

  getPacks(
    params?: BlueMojiPacksGetPacks.QueryParams,
    opts?: BlueMojiPacksGetPacks.CallOptions,
  ): Promise<BlueMojiPacksGetPacks.Response> {
    return this._client.call(
      'blue.moji.packs.getPacks',
      params,
      undefined,
      opts,
    )
  }
}

export class PackRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueMojiPacksPack.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.moji.packs.pack',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: BlueMojiPacksPack.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.moji.packs.pack',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueMojiPacksPack.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.moji.packs.pack'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.moji.packs.pack', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'blue.moji.packs.pack', ...params },
      { headers },
    )
  }
}

export class PackitemRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueMojiPacksPackitem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.moji.packs.packitem',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: BlueMojiPacksPackitem.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.moji.packs.packitem',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueMojiPacksPackitem.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.moji.packs.packitem'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.moji.packs.packitem', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'blue.moji.packs.packitem', ...params },
      { headers },
    )
  }
}

export class BlueMojiRichtextNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}

export class ComNS {
  _client: XrpcClient
  atproto: ComAtprotoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.atproto = new ComAtprotoNS(client)
  }
}

export class ComAtprotoNS {
  _client: XrpcClient
  repo: ComAtprotoRepoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.repo = new ComAtprotoRepoNS(client)
  }
}

export class ComAtprotoRepoNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}
