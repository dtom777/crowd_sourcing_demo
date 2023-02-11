import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import { memo, VFC } from 'react';

type Props = {
  slug: string | string[];
};

const CategoryTags: VFC<Props> = ({ slug }) => {
  let tags = [];
  switch (slug) {
    case 'living':
      tags = livingTags;
      break;
    case 'learning':
      tags = learningTags;
      break;
    case 'manufacturing':
      tags = manufacturingTags;
      break;
    case 'chatting':
      tags = chattingTags;
      break;
    case 'entertainment':
      tags = entertainmentTags;
      break;
    case 'heart':
      tags = heartTags;
      break;
    case 'business':
      tags = businessTags;
      break;
    case 'career':
      tags = careerTags;
      break;
    case 'job-offer':
      tags = jobOfferTags;
      break;
    case 'job-seeking':
      tags = jobSeekingTags;
      break;
  }

  return (
    <ul className='flex flex-wrap'>
      {tags.map((tag) => (
        <li
          key={tag.name}
          className='bg-gray-200 text-gray-700 text-sm rounded-md my-1 mx-2 py-1 px-3 hover:opacity-50'
        >
          <BaseLinkButton
            href={{
              pathname: '/search',
              query: { query: tag.name },
            }}
          >
            {tag.name}
          </BaseLinkButton>
        </li>
      ))}
    </ul>
  );
};

export default memo(CategoryTags);

const livingTags = [
  { name: '育児' },
  { name: '子育て' },
  { name: '医療' },
  { name: '健康' },
  { name: 'ファッション' },
  { name: '美容' },
  { name: '旅行' },
  { name: 'レジャー' },
  { name: 'PC' },
  { name: '家電' },
  { name: '政治' },
  { name: '経済' },
];
const learningTags = [{ name: '語学' }, { name: '資格' }, { name: 'レッスン' }];
const manufacturingTags = [
  { name: '写真' },
  { name: '映像' },
  { name: '楽曲制作' },
  { name: 'イラスト' },
  { name: 'デザイン' },
  { name: 'ライティング' },
  { name: 'プログラミング' },
  { name: 'Web制作' },
  { name: '翻訳' },
];
const chattingTags = [
  { name: 'ランチ' },
  { name: 'お茶' },
  { name: 'モーニング' },
  { name: '雑談' },
];
const entertainmentTags = [
  { name: '本' },
  { name: '漫画' },
  { name: '映画' },
  { name: '音楽' },
  { name: 'ゲーム' },
  { name: 'インターネット' },
  { name: 'スポーツ' },
  { name: '占い' },
];
const heartTags = [
  { name: '心理学' },
  { name: '哲学' },
  { name: '恋愛' },
  { name: 'コーチング' },
  { name: 'カウンセリング' },
];
const businessTags = [
  { name: 'マーケティング' },
  { name: '会計' },
  { name: '法律' },
  { name: '広報' },
  { name: 'PR' },
  { name: 'ビジネスツール' },
  { name: 'ビジネスパート' },
];
const careerTags = [{ name: '就職' }, { name: '転職' }, { name: '進路' }];
const jobOfferTags = [
  { name: '正社員' },
  { name: '副業' },
  { name: '業務委託' },
  { name: 'インターン' },
];
const jobSeekingTags = [
  { name: '正社員' },
  { name: '副業' },
  { name: '業務委託' },
  { name: 'アルバイト' },
  { name: 'インターン' },
  { name: 'ボランティア' },
];
