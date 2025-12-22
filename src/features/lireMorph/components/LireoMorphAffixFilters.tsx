interface LireoMorphAffixFiltersProps {
  showPrefixes: boolean;
  showSuffixes: boolean;
  togglePrefixes: () => void;
  toggleSuffixes: () => void;
}

const LireoMorphAffixFilters = ({ 
  showPrefixes, 
  showSuffixes, 
  togglePrefixes, 
  toggleSuffixes 
}: LireoMorphAffixFiltersProps) => {
  return (
    <div className="affixFiltersContainer">
      <div className="checkboxGroup">
        <label className="checkboxLabel prefixLabel">
          <input
            type="checkbox"
            checked={showPrefixes}
            onChange={togglePrefixes}
            className="affixCheckbox prefixCheckbox"
          />
          <span className="checkboxText">Prefixo</span>
        </label>
      </div>
      
      <div className="checkboxGroup">
        <label className="checkboxLabel suffixLabel">
          <input
            type="checkbox"
            checked={showSuffixes}
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
