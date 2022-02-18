import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import StaticArticleNav from "../components/StaticArticleNav";
import Block from "../components/Block";
import Footer from "../components/Footer";
import Background from "../components/Background";

import { H5 } from "../components/standard/H";

import { LanguageContext } from "../contexts/Language";

interface propsInterface {
  children: JSX.Element | JSX.Element[] | never[] | null | undefined;
}
interface paramsInterface {
  lang?: string | undefined;
}

const en: string[] = [
  "More articles",
  "Why Katrade",
  "About us",
  "Contact us",
  "Trading policies and advices",
  "Terms",
  "Privacy",
];
const th: string[] = [
  "บทความอื่นๆ",
  "ทำไมต้อง Katrade",
  "เกี่ยวกับเรา",
  "ติดต่อเรา",
  "ข้อตกลงการเทรดและคำแนะนำ",
  "ข้อตกลงการใช้งาน",
  "ความเป็นส่วนตัว",
];

export default function ArticleTemplate({ children }: propsInterface) {
  const { lang } = useContext(LanguageContext);
  const [content, setContent] = useState<string[]>(lang === "en" ? en : th);
  const [mobile, setMobile] = useState<boolean>(false);
  window.addEventListener("resize", resize);
  function resize() {
    if (window.innerWidth < 576) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }
  useEffect(() => {
    resize();
  }, []);

  useEffect(() => {
    setContent(lang === "en" ? en : th);
  }, [lang]);

  return (
    <>
      <Background>
        <StaticArticleNav />
        <Block height="80vh" className="">
          <div className="full-width maxwidth100">
            <div className="row my-5 mx-2 full-width">
              <div className={"col-lg-8 m-0" + (mobile ? "" : "px-3")}>
                {children}
              </div>
              <div className="col-lg-4 m-0 p-3">
                <H5>{content[0]}</H5>
                <hr />
                <a href="/" className="article-link">
                  {content[1]}
                </a>
                <br />
                <a href="/articles/about/developers" className="article-link">
                  {content[2]}
                </a>
                <br />
                <a href="/" className="article-link">
                  {content[3]}
                </a>
                <br />
                <a href="/" className="article-link">
                  {content[4]}
                </a>
                <br />
                <a href="/" className="article-link">
                  {content[5]}
                </a>
                <br />
                <a href="/" className="article-link">
                  {content[6]}
                </a>
                <br />
              </div>
            </div>
          </div>
        </Block>
        <Footer />
      </Background>
    </>
  );
}
