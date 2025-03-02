/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'
import * as BlueMarilStellarReaction from './reaction'
import * as BlueMojiCollectionItem from '../../moji/collection/item'

export interface QueryParams {
  /** The number of records to return. */
  limit?: number
  cursor?: string
  did?: string
}

export type InputSchema = undefined

export interface OutputSchema {
  cursor?: string
  items: ItemView[]
  [k: string]: unknown
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}

export interface ItemView {
  ref: BlueMarilStellarReaction.EmojiRef
  record: BlueMojiCollectionItem.ItemView
  [k: string]: unknown
}

export function isItemView(v: unknown): v is ItemView {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'blue.maril.stellar.getEmojis#itemView'
  )
}

export function validateItemView(v: unknown): ValidationResult {
  return lexicons.validate('blue.maril.stellar.getEmojis#itemView', v)
}
