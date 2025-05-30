import React from "react";
import { SectionUserGuideProps } from "./SectionInterfaces";
import { getPublicAssetUrl } from "../../../../utils/pathUtils";

const SectionUserGuide: React.FC<SectionUserGuideProps> = ({
  title,
  content,
}) => {
  return (
    <div className="userGuide__section">
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
                    {listItem.obs && (
                      <span className="obs">{listItem.obs}</span>
                    )}
                    {listItem.bold && <strong>{listItem.bold}</strong>}
                    {listItem.text}
                  </li>
                ))}
              </ul>
            );

          case "image":
            return (
              <img
                key={index}
                src={getPublicAssetUrl(item.image?.src)}
                alt={item.image?.alt}
              />
            );

          case "observation":
            return (
              <p key={index}>
                <span className="obs">{item.obs}</span>
                {item.text}
              </p>
            );

          case "subsection":
            return (
              <div key={index}>
                {item.subsection?.map((subItem, subIndex) => (
                  <div key={subIndex}>
                    <h3>{subItem.title}</h3>

                    {subItem.content.map((contentItem, contentIndex) => {
                      switch (contentItem.type) {
                        case "text":
                          return <p key={contentIndex}>{contentItem.text}</p>;

                        case "list":
                          return (
                            <ul key={contentIndex}>
                              {contentItem.items?.map((listItem, listIndex) => (
                                <>
                                  <li key={listIndex}>
                                    {listItem.bold && (
                                      <strong>{listItem.bold}</strong>
                                    )}
                                    {listItem.text}
                                  </li>
                                  {listItem.image && (
                                    <img
                                      src={getPublicAssetUrl(
                                        listItem.image.src
                                      )}
                                      alt={listItem.image.alt}
                                    />
                                  )}
                                </>
                              ))}
                            </ul>
                          );

                        case "image":
                          return (
                            <img
                              key={contentIndex}
                              src={getPublicAssetUrl(contentItem.image?.src)}
                              alt={contentItem.image?.alt}
                            />
                          );

                        default:
                          return null;
                      }
                    })}
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default SectionUserGuide;
