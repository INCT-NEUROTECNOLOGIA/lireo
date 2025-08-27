import React from "react";
import { SectionUserGuideProps } from "./SectionInterfaces";
import { getPublicAssetUrl } from "../../utils/pathUtils";

const SectionUserGuide: React.FC<SectionUserGuideProps> = ({
  title,
  id,
  className,
  content,
}) => {
  return (
    <section id={id} className={`userGuide__section ${className}`}>
      <h2>{title}</h2>

      {content.map((item, index) => {
        switch (item.type) {
          case "text":
            return <p key={index}>{item.text}</p>;

          case "list":
            return (
              <ul key={index}>
                {item.items?.map((listItem, listIndex) => (
                  <li key={listIndex}>
                    {listItem.bold && <strong>{listItem.bold}</strong>}
                    {listItem.text}
                  </li>
                ))}
              </ul>
            );

          case "listChevron":
            return (
              <div className="list" key={index}>
                {item.items?.map((listItem, listIndex) => (
                  <p key={listIndex}>
                    <i className="bi bi-chevron-right"></i>
                    {listItem.bold && <strong>{listItem.bold}</strong>}
                    {listItem.text}
                  </p>
                ))}
              </div>
            );

          case "listCheck":
            return (
              <div className="list" key={index}>
                {item.items?.map((listItem, listIndex) => (
                  <p key={listIndex}>
                    <i className="bi bi-check-circle-fill"></i>
                    {listItem.bold && <strong>{listItem.bold}</strong>}
                    {listItem.text}
                  </p>
                ))}
              </div>
            );

          case "image":
            return (
              <img
                key={index}
                src={getPublicAssetUrl(item.image?.src)}
                alt={item.image?.alt}
              />
            );

          case "imageSmall":
            return (
              <img
                className="img-small"
                key={index}
                src={getPublicAssetUrl(item.image?.src)}
                alt={item.image?.alt}
              />
            );

          case "link":
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            );

          default:
            return null;
        }
      })}
    </section>
  );
};

export default SectionUserGuide;
