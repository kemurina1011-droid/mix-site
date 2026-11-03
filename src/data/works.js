export const works = [
  // =========================================================
  // Full
  // =========================================================

  {
    id: "full-eid5V3nHLPo",
    videoId: "eid5V3nHLPo",
    type: "full",
    title:
      "キュートアグレッション / キタニタツヤ (cover) 【歌ってみた】",
    publishedAt: "2026-11-03",
    active: true,
  },

  {
    id: "full-mp7CqTKDtzM",
    videoId: "mp7CqTKDtzM",
    type: "full",
    title:
      "アイリッド / ぬゆり (Cover) 【歌ってみた】",
    publishedAt: "",
    active: true,
  },

  {
    id: "full-QlIenrDbxn4",
    videoId: "QlIenrDbxn4",
    type: "full",
    title:
      "【歌ってみた】シャンティ / 緑月 Cover 【新人Vtuber】",
    publishedAt: "",
    active: true,
  },

  {
    id: "full-nXQ-MYNGZ_Q",
    videoId: "nXQ-MYNGZ_Q",
    type: "full",
    title:
      "月のワルツ 歌ってみた【砂つみの】",
    publishedAt: "",
    active: true,
  },

  {
    id: "full-AwDtTxBscYU",
    videoId: "AwDtTxBscYU",
    type: "full",
    title:
      "スキスキ絶頂症 covered by うたげ",
    publishedAt: "",
    active: true,
  },

  // =========================================================
  // Short
  // =========================================================

  {
    id: "short-QmbpXXyG47c",
    videoId: "QmbpXXyG47c",
    type: "short",
    title:
      "♬【ラプラスショコラ】編集して歌ってみた。",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-KdWQRyU9moA",
    videoId: "KdWQRyU9moA",
    type: "short",
    title:
      "♫【G4L/Giga】編集して歌ってみた。",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-E5cYXHNgqU8",
    videoId: "E5cYXHNgqU8",
    type: "short",
    title:
      "プレイ(PLAY) / Giga 歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-t1uw-C0MCMc",
    videoId: "t1uw-C0MCMc",
    type: "short",
    title:
      "【リクエスト】偽物人間40号 / ¿?shimon サビ歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-G1bXqKQeIz8",
    videoId: "G1bXqKQeIz8",
    type: "short",
    title:
      "セレナーデ / なとり 歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-l88HAdX0ADE",
    videoId: "l88HAdX0ADE",
    type: "short",
    title:
      "LA･LA･LA LOVE SONG / 久保田利伸 サビ歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-1EVafrCgQZA",
    videoId: "1EVafrCgQZA",
    type: "short",
    title:
      "IRIS OUT / 米津玄師 サビ歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-iYz05eqiRFM",
    videoId: "iYz05eqiRFM",
    type: "short",
    title:
      "「プロポーズ／なとり」歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-scxmy883xIM",
    videoId: "scxmy883xIM",
    type: "short",
    title:
      "「革命道中 - On The Way／アイナ・ジ・エンド」歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-bc1O84fGR8U",
    videoId: "bc1O84fGR8U",
    type: "short",
    title:
      "「IRIS OUT」歌ってみた",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-DiM_eg4D44U",
    videoId: "DiM_eg4D44U",
    type: "short",
    title:
      "ワールドイズマインCPK!Remix 葬星むくろcover",
    publishedAt: "",
    active: true,
  },

  {
    id: "short-49plVaZKlJ0",
    videoId: "49plVaZKlJ0",
    type: "short",
    title:
      "『 IRIS OUT 』歌ってみた 【葬星むくろ】",
    publishedAt: "",
    active: true,
  },
]

// =========================================================
// Utility
// =========================================================

export function getActiveWorks() {
  return works.filter((work) => work.active)
}

export function getFullWorks() {
  return works.filter(
    (work) =>
      work.active &&
      work.type === "full"
  )
}

export function getShortWorks() {
  return works.filter(
    (work) =>
      work.active &&
      work.type === "short"
  )
}

export function getWorksByType(type) {
  return works.filter(
    (work) =>
      work.active &&
      work.type === type
  )
}

export function getWorkById(id) {
  return works.find(
    (work) => work.id === id
  )
}