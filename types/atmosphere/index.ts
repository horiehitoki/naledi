/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as OrgGunjoNalediGetActorReactions from './types/org/gunjo/naledi/getActorReactions'
import * as OrgGunjoNalediGetEmojis from './types/org/gunjo/naledi/getEmojis'
import * as OrgGunjoNalediGetReactions from './types/org/gunjo/naledi/getReactions'
import * as OrgGunjoNalediReaction from './types/org/gunjo/naledi/reaction'
import * as BlueLinkatBoard from './types/blue/linkat/board'
import * as FyiUnravelFrontpagePost from './types/fyi/unravel/frontpage/post'
import * as ComWhtwndBlogEntry from './types/com/whtwnd/blog/entry'
import * as ComWhtwndBlogDefs from './types/com/whtwnd/blog/defs'
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
import * as AppBskyRichtextFacet from './types/app/bsky/richtext/facet'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export * as OrgGunjoNalediGetActorReactions from './types/org/gunjo/naledi/getActorReactions'
export * as OrgGunjoNalediGetEmojis from './types/org/gunjo/naledi/getEmojis'
export * as OrgGunjoNalediGetReactions from './types/org/gunjo/naledi/getReactions'
export * as OrgGunjoNalediReaction from './types/org/gunjo/naledi/reaction'
export * as BlueLinkatBoard from './types/blue/linkat/board'
export * as FyiUnravelFrontpagePost from './types/fyi/unravel/frontpage/post'
export * as ComWhtwndBlogEntry from './types/com/whtwnd/blog/entry'
export * as ComWhtwndBlogDefs from './types/com/whtwnd/blog/defs'
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
export * as AppBskyRichtextFacet from './types/app/bsky/richtext/facet'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export class AtpBaseClient extends XrpcClient {
  blue: BlueNS
  fyi: FyiNS
  com: ComNS
  app: AppNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.blue = new BlueNS(this)
    this.fyi = new FyiNS(this)
    this.com = new ComNS(this)
    this.app = new AppNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class BlueNS {
  _client: XrpcClient
  gunjo: OrgGunjoNS
  linkat: BlueLinkatNS
  moji: BlueMojiNS

  constructor(client: XrpcClient) {
    this._client = client
    this.gunjo = new OrgGunjoNS(client)
    this.linkat = new BlueLinkatNS(client)
    this.moji = new BlueMojiNS(client)
  }
}

export class OrgGunjoNS {
  _client: XrpcClient
  naledi: OrgGunjoNalediNS

  constructor(client: XrpcClient) {
    this._client = client
    this.naledi = new OrgGunjoNalediNS(client)
  }
}

export class OrgGunjoNalediNS {
  _client: XrpcClient
  reaction: ReactionRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.reaction = new ReactionRecord(client)
  }

  getActorReactions(
    params?: OrgGunjoNalediGetActorReactions.QueryParams,
    opts?: OrgGunjoNalediGetActorReactions.CallOptions,
  ): Promise<OrgGunjoNalediGetActorReactions.Response> {
    return this._client.call(
      'org.gunjo.naledi.getActorReactions',
      params,
      undefined,
      opts,
    )
  }

  getEmojis(
    params?: OrgGunjoNalediGetEmojis.QueryParams,
    opts?: OrgGunjoNalediGetEmojis.CallOptions,
  ): Promise<OrgGunjoNalediGetEmojis.Response> {
    return this._client.call(
      'org.gunjo.naledi.getEmojis',
      params,
      undefined,
      opts,
    )
  }

  getReactions(
    params?: OrgGunjoNalediGetReactions.QueryParams,
    opts?: OrgGunjoNalediGetReactions.CallOptions,
  ): Promise<OrgGunjoNalediGetReactions.Response> {
    return this._client.call(
      'org.gunjo.naledi.getReactions',
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
    records: { uri: string; value: OrgGunjoNalediReaction.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.gunjo.naledi.reaction',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgGunjoNalediReaction.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.gunjo.naledi.reaction',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: OrgGunjoNalediReaction.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'org.gunjo.naledi.reaction'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'org.gunjo.naledi.reaction', ...params, record },
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
      { collection: 'org.gunjo.naledi.reaction', ...params },
      { headers },
    )
  }
}

export class BlueLinkatNS {
  _client: XrpcClient
  board: BoardRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.board = new BoardRecord(client)
  }
}

export class BoardRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueLinkatBoard.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.linkat.board',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: BlueLinkatBoard.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.linkat.board',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueLinkatBoard.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.linkat.board'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.linkat.board', rkey: 'self', ...params, record },
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
      { collection: 'blue.linkat.board', ...params },
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

export class FyiNS {
  _client: XrpcClient
  unravel: FyiUnravelNS

  constructor(client: XrpcClient) {
    this._client = client
    this.unravel = new FyiUnravelNS(client)
  }
}

export class FyiUnravelNS {
  _client: XrpcClient
  frontpage: FyiUnravelFrontpageNS

  constructor(client: XrpcClient) {
    this._client = client
    this.frontpage = new FyiUnravelFrontpageNS(client)
  }
}

export class FyiUnravelFrontpageNS {
  _client: XrpcClient
  post: PostRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.post = new PostRecord(client)
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
    records: { uri: string; value: FyiUnravelFrontpagePost.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'fyi.unravel.frontpage.post',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: FyiUnravelFrontpagePost.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'fyi.unravel.frontpage.post',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: FyiUnravelFrontpagePost.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'fyi.unravel.frontpage.post'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'fyi.unravel.frontpage.post', ...params, record },
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
      { collection: 'fyi.unravel.frontpage.post', ...params },
      { headers },
    )
  }
}

export class ComNS {
  _client: XrpcClient
  whtwnd: ComWhtwndNS
  atproto: ComAtprotoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.whtwnd = new ComWhtwndNS(client)
    this.atproto = new ComAtprotoNS(client)
  }
}

export class ComWhtwndNS {
  _client: XrpcClient
  blog: ComWhtwndBlogNS

  constructor(client: XrpcClient) {
    this._client = client
    this.blog = new ComWhtwndBlogNS(client)
  }
}

export class ComWhtwndBlogNS {
  _client: XrpcClient
  entry: EntryRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.entry = new EntryRecord(client)
  }
}

export class EntryRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: ComWhtwndBlogEntry.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'com.whtwnd.blog.entry',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: ComWhtwndBlogEntry.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'com.whtwnd.blog.entry',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: ComWhtwndBlogEntry.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'com.whtwnd.blog.entry'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'com.whtwnd.blog.entry', ...params, record },
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
      { collection: 'com.whtwnd.blog.entry', ...params },
      { headers },
    )
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
  richtext: AppBskyRichtextNS

  constructor(client: XrpcClient) {
    this._client = client
    this.richtext = new AppBskyRichtextNS(client)
  }
}

export class AppBskyRichtextNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}
