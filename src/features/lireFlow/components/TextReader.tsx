import React from 'react';
import TextDisplay from './TextDisplay.jsx';
import Loading from '../../../utils/components/Loading.tsx';
import '../layout/textReaderStyle.css';
import { textReaderTexts } from '../text/textReaderTexts.ts';
import { useTextReader } from '../hooks/useTextReader';

const TextReader: React.FC = () => {
  const {
    state,
    selectedFile,
    selectedText,
    dropFile,
    dragFile,
    dragLeave,
    handleFileUploader,
    resetSelectFile,
    resetSelectText,
  } = useTextReader();

  return (
    <>
      <div
        className={'taskSummary' + (state.fileUploaderClose ? ' hidden' : '')}
      >
        <h1>{textReaderTexts.summary.title}</h1>
        <ul>
          {textReaderTexts.summary.texts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
          <li>
            {textReaderTexts.summary.linkText}
            <a
              href={textReaderTexts.summary.linkRef}
              target="_blank"
              rel="noopener noreferrer"
            >
              {textReaderTexts.summary.link}
            </a>
          </li>
        </ul>
      </div>

      <div className="textReaderContainer">
        <div
          className={
            'textReaderContainer__fileUploader' +
            (state.fileUploaderClose ? ' hidden' : '')
          }
          onDrop={dropFile}
          onDragOver={dragFile}
          onDragLeave={dragLeave}
          style={{
            backgroundColor: state.isDragging
              ? 'var(--color-accent-hover)'
              : 'var(--color-accent)',
          }}
        >
          <i className="bi bi-cloud-upload"></i>
          <div className="textReaderContainer__fileUploader__text">
            {textReaderTexts.uploadText}{' '}
            <strong>{textReaderTexts.uploadText2}</strong>{' '}
            {textReaderTexts.uploadText3}
          </div>
          <div className="textReaderContainer__fileUploader__inputSelectGroup">
            <label
              htmlFor="upload-file"
              className="textReaderContainer__fileUploader__label"
              title={textReaderTexts.uploadText4}
            >
              <strong>{textReaderTexts.uploadText4}</strong>
            </label>
            <input
              id="upload-file"
              type="file"
              onClick={resetSelectFile}
              onChange={selectedFile}
              className="textReaderContainer__fileUploader__input"
            />
            {textReaderTexts.uploadText5}
            <select
              className="textReaderContainer__fileUploader__selectText"
              name="texts"
              id="texts"
              defaultValue=""
              onChange={selectedText}
              ref={resetSelectText}
              title={textReaderTexts.placeholderSelectText}
            >
              <option value="" disabled>
                {textReaderTexts.placeholderSelectText}
              </option>
              {textReaderTexts.texts.map((text, index) => (
                <option key={index} value={text} title={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
        </div>

        {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

        {state.fileName && (
          <div className="textReaderContainer__header">
            <p className="textReaderContainer__fileName" title={state.fileName}>
              <strong>{textReaderTexts.fileText}</strong> {state.fileName}
            </p>

            {state.fileUploaderClose && (
              <button
                className="textReaderContainer__button"
                onClick={handleFileUploader}
              >
                {textReaderTexts.newText}
              </button>
            )}
          </div>
        )}

        {state.isLoading && !state.fileContent ? (
          <Loading />
        ) : (
          <TextDisplay fileContent={state.fileContent} />
        )}
      </div>
    </>
  );
};

export default TextReader;
