import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/Language";

import ArticleTemplate from "../templates/Article";

import { H3 } from "../components/standard/H";
import P from "../components/standard/P";

import main5 from "../pics/main5.png";
interface paramsInterface {
  lang?: string;
}

const th = [
  "ทำไมต้อง Katrade",
  "Katrade คืออะไร? เว็บแอพพลิเคชั่นสำหรับแลกเปลี่ยนสิ่งของกับผู้อื่น โดยเราสามารถนำของที่เราไม่ต้องการแล้วแต่ผู้อื่นอาจต้องการมาแลกเปลี่ยนกันเพื่อที่เราจะไม่ต้องทิ้งไปอย่างสูญเปล่า",
  "ประโยชน์ของ Katrade",
  "1. ลดปริมาณขยะ เราไม่ต้องนำของที่ไม่ใช้แล้วของเราไม่ทิ้งอย่างสูญเปล่า ลดปริมาณขยะ แม้ว่าเราจะลดไปแค่ไม่กี่ชิ้นแต่ก็สามารถลดเป็น 1000 เป็น 10,000 ชิ้นได้เพราะเรามีหลายคน",
  "2. ได้พบเจอ/พูดคุยกับคนที่สนใจอะไรที่เหมือนกัน เกิดcommunityจากการเทรดอะไรที่เหมือนกัน เช่น เรานำนิยายที่อ่านจบแล้วไปแลกกับนิยายของคนอื่น ก็จะสามารถนำมาคุยกันได้",
  "3. ได้ของที่ต้องการโดยไม่ต้องเสียเงิน หากเราต้องการของใช้ใหม่ๆโดยที่เราไม่มีเงินเราก็มีโอกาศได้มาโดยไม่ต้องเสียเงิน",
];
const en = [
  "Why Katrade?",
  "Katrade is an application for trading items with others. We can swap your unused items with your friends, so these items may useful to the others. And yeah, you just make the world better by not letting your items becomes a trash.",
  "Our benefits",
  "1. Reduce wastes/trashes which produces from a single human.",
  "2. Trade what you like to anyone and find someone who has the same passions",
  "3. Own something without losing money.",
];

export default function WhyKatrade() {
  const { lang } = useContext(LanguageContext);
  const [content, setContent] = useState<string[]>(lang === "en" ? en : th);

  useEffect(() => {
    setContent(lang === "en" ? en : th);
  }, [lang]);

  return (
    <ArticleTemplate>
      <div className="mb-5">
        <H3>{content[0]}</H3>
        <P>{content[1]}</P>
      </div>
      <div className="mb-5">
        <img src={main5} width="100%" />
        <H3>{content[2]}</H3>
        <P>{content[3]}</P>
        <P>{content[4]}</P>
        <P>{content[5]}</P>
      </div>
    </ArticleTemplate>
  );
}
