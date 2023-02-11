import { memo, VFC } from 'react';

const ApplicationInformation: VFC = () => {
  return (
    <section>
      <h2 className='py-2 px-4  bg-black text-white font-bold text-sm'>
        応募後の流れ
      </h2>
      <ul className='py-2 md:text-sm text-xs'>
        <li>・あなたのメッセージとアカウント情報が送信されます。</li>
        <li>・募集者が興味をもった場合はメッセージの返信が届きます。</li>
        <li>・メッセージの返信はメールにも通知されます。</li>
        <li>・最後のメッセージから２週間経つと自動で終了されます。</li>
        <li>&emsp;※お問い合わせはこちらへどうぞ。</li>
      </ul>
    </section>
  );
};

export default memo(ApplicationInformation);
