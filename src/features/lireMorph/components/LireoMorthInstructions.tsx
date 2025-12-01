import { ROUTE_PATHS } from '../../../config/routes';
import { lireMorphText } from '../texts/lireMorphText';

interface LireoMorthInstructionsProps {
  summaryClose: boolean;
}

const LireoMorthInstructions = ({
  summaryClose,
}: LireoMorthInstructionsProps) => {
  return (
    <div className={'taskSummary' + (summaryClose ? ' hidden' : '')}>
      <h1>{lireMorphText.summary.title}</h1>
      <ul>
        {lireMorphText.summary.texts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
        <li>
          {lireMorphText.summary.linkText}
          <a
            href={ROUTE_PATHS.USER_GUIDE_LIRE_GROW}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lireMorphText.summary.link}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LireoMorthInstructions;
