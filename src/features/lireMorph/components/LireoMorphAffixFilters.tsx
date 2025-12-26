interface LireoMorphAffixFiltersProps {
  showPrefixes: boolean;
  showSuffixes: boolean;
  isPrefixesDisable: boolean;
  isSuffixesDisable: boolean;
  togglePrefixes: () => void;
  toggleSuffixes: () => void;
}

const LireoMorphAffixFilters = ({
  showPrefixes,
  showSuffixes,
  isPrefixesDisable,
  isSuffixesDisable,
  togglePrefixes,
  toggleSuffixes,
}: LireoMorphAffixFiltersProps) => {
  return (
    <div className="affixFiltersContainer">
      <div className={`checkboxGroup ${isPrefixesDisable ? 'disabled' : ''}`}>
        <label className="checkboxLabel prefixLabel">
          <input
            type="checkbox"
            id="prefix"
            checked={showPrefixes}
            disabled={isPrefixesDisable}
            onChange={togglePrefixes}
            className="affixCheckbox prefixCheckbox"
          />
          <span className="checkboxText">Prefixo</span>
        </label>
      </div>

      <div className={`checkboxGroup ${isSuffixesDisable ? 'disabled' : ''}`}>
        <label className="checkboxLabel suffixLabel">
          <input
            type="checkbox"
            id="suffix"
            checked={showSuffixes}
            disabled={isSuffixesDisable}
            onChange={toggleSuffixes}
            className="affixCheckbox suffixCheckbox"
          />
          <span className="checkboxText">Sufixo</span>
        </label>
      </div>
    </div>
  );
};

export default LireoMorphAffixFilters;
