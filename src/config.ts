/**
 * Shopify 应用市场的正式列表地址。
 *
 * 2026-08-11 实测该地址已是真实上架页（标题 "Maxproof Shoppable Video & UGC —
 * Shoppable video widgets with sales attribution"），不是占位符。
 *
 * 全站每一个主 CTA —— 导航栏（桌面 + 移动菜单）、hero、归因段、定价面板、页脚 ——
 * 都读这一个常量。要换地址只改这一处。
 */
export const APP_STORE_URL = "https://apps.shopify.com/maxproof";

/**
 * 公开发放的 DIRECT 邀请码，兑换后得 7 天 Pro 试用。
 *
 * 之所以敢挂在公开页面上，是 DIRECT 这个 kind 的语义决定的（见 app 侧
 * `prisma/schema.prisma` 的 InviteCode 与 `app/utils/invite.redeem.ts`）：
 *
 * - **无兑换次数上限**：DIRECT 由创始人手发、`ownerShop = null` 无归属，
 *   不像 REFERRAL 要从码主的试用预算里扣。第一个访客用了不会把码烧掉。
 * - **永不过期**：DIRECT 的 `validUntil` 恒为 null。REFERRAL 才绑码主试用窗口。
 * - **一店一生一次**：限制在店那一侧，不在码这一侧（`ALREADY_REDEEMED`）。
 *
 * ⚠️ 页面文案必须说清「先兑码、再订阅」：已有有效订阅的店兑码会被
 * `HAS_SUBSCRIPTION` 拒掉，装完就点订阅的商家会白丢这 7 天。
 */
export const INVITE_CODE = "gKgEYodq";

/** 兑码得到的试用天数。与 app 侧 `invite.trial.ts` 的 `REDEEM_TRIAL_DAYS` 同值。 */
export const INVITE_TRIAL_DAYS = 7;
