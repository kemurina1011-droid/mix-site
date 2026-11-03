export const services = [
  {
    id: "pitch",
    title: "ピッチ補正",

    description:
      "歌声の自然さを残しながら、必要な箇所を中心にピッチを整えます。",

    note:
      "過度に機械的な補正にならないよう、楽曲と歌唱に合わせて調整します。",

    active: true,

    /*
     * 最初に中央へ表示するカード
     */
    featured: true,

    order: 1,
  },

  {
    id: "timing",
    title: "タイミング補正",

    description:
      "ボーカルのタイミングを楽曲に合わせて自然に整えます。",

    note:
      "歌唱のノリやニュアンスを残しながら、必要な部分だけを補正します。",

    active: true,
    featured: false,

    order: 2,
  },

  {
    id: "noise",
    title: "ノイズ処理",

    description:
      "不要なノイズや、録音・編集上気になる部分を確認して必要に応じて処理します。",

    note:
      "元の歌声への影響を抑えながら、必要な範囲で調整します。",

    active: true,
    featured: false,

    order: 3,
  },

  {
    id: "harmony",
    title: "ハモリ生成",

    description:
      "楽曲に合わせて必要なハモリパートを生成・調整します。",

    note:
      "原曲や歌唱内容に応じて、自然に馴染むハモリを制作します。",

    active: true,
    featured: false,

    order: 4,
  },

  {
    id: "vocal-mix",
    title: "ボーカルMIX",

    description:
      "ボーカルを前に出しながら、インストへ自然に馴染むバランスへ仕上げます。",

    note:
      "聴き疲れしにくく、楽曲全体として自然に聴こえる仕上がりを重視します。",

    active: true,
    featured: false,

    order: 5,
  },

  {
    id: "mastering",
    title: "マスタリング",

    description:
      "完成したMIXを、投稿・配信に適した音量とバランスへ整えます。",

    note:
      "過度な音圧処理を避け、楽曲の質感を残しながら仕上げます。",

    active: true,
    featured: false,

    order: 6,
  },
];


/* =========================================================
   Utility
   ========================================================= */


/*
 * 公開対象サービス
 */
export function getActiveServices() {
  return services
    .filter(
      (item) =>
        item.active === true
    )
    .sort(
      (a, b) =>
        a.order - b.order
    );
}


/*
 * ID指定
 */
export function getServiceById(id) {
  return services.find(
    (item) =>
      item.id === id
  );
}


/*
 * 最初に中央表示するサービス
 */
export function getFeaturedService() {
  return services.find(
    (item) =>
      item.active === true &&
      item.featured === true
  );
}