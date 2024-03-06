import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/bio.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import delete_icon_img from "@/public/assets/delete_icon.png"
const SearchSelectInputField = ({
  SkillList,
  defaultValue,
  selectedDropdownValue,
  setSelectedDropdownValue,
  placeholder,
  name,
  selectDropDownReset,
  setSelectDropDownReset,
  setTechnical,
  removeRow,
  index,
  technical,
}: any) => {
  console.log("karigar dataa", SkillList);

  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);

  console.log(defaultValue, "karigar data in search");
  useEffect(() => {
    if (selectDropDownReset !== undefined && selectDropDownReset === true)
      setSelectedDropdownValue("");
  }, [selectDropDownReset, setSelectedDropdownValue]);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      // Check if the input element itself or the client group select dropdown was clicked
      const isSelectClicked =
        e.target.tagName === "SELECT" &&
        e.target.classList.contains("form-select");

      if (
        e?.target !== inputRef?.current &&
        !inputRef?.current?.contains(e.target) &&
        !dropdownRef?.current?.contains(e.target) &&
        !isSelectClicked
      ) {
        setShowDropdown(false);
      }
    };
    const handleKeyDropdown = (e: any) => {
      // Check if a key other than arrow keys or Enter key was pressed
      if (![37, 38, 39, 40, 13].includes(e.keyCode)) {
        setShowDropdown(false);
      }
    };

    const handleClientGroupDropdownClick = (e: any) => {
      // Stop event propagation for client group dropdown
      e.stopPropagation();
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDropdown);

    document
      .querySelector(".form-select.form-select-sm.border")
      ?.addEventListener("click", handleClientGroupDropdownClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document
        .querySelector(".form-select.form-select-sm.border")
        ?.removeEventListener("click", handleClientGroupDropdownClick);
      document.removeEventListener("keydown", handleKeyDropdown);
    };
  }, [inputRef]);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const selectedItem = dropdownRef.current.childNodes[
        selectedIndex
      ] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, showDropdown]);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
    setSelectedIndex(-1);
    setFilterDropdownList(SkillList?.length > 0 && SkillList);
    setSelectDropDownReset(false);
  };

  const handleSelectedOption = (data: any, i: any) => {
    console.log(data, "selected languages");
    setSelectedDropdownValue(data?.name);
    setShowDropdown(false);
    setSelectedIndex(i !== undefined ? i : -1);

    setTechnical((prevTechnical: any) => {
      return prevTechnical.map((skills: any, i: any) => {
        if (
          skills?.technical_skills !== data.name ||
          skills?.language !== data.name
        ) {
          if (i === index && name === "technical_skills") {
            return {
              ...skills,
              technical_skills: data?.name,
            };
          }
          if (i === index && name === "language") {
            return {
              ...skills,
              language: data?.name,
            };
          }
          return skills;
        }
      });
    });
  };

  const handleDocumentClick = (e: any) => {
    if (
      e?.target !== inputRef?.current &&
      !inputRef?.current?.contains(e?.target)
    ) {
      setShowDropdown(true);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown" && !showDropdown) {
      e.preventDefault();
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else if (e.key === "ArrowDown" && showDropdown) {
      setSelectedIndex((prevIndex: any) =>
        prevIndex < filterDropdownList?.length - 1 ? prevIndex + 1 : prevIndex
      );
      setScrollIndex((prevScrollIndex) =>
        Math.min(prevScrollIndex + 1, filterDropdownList?.length - 1)
      );
    } else if (e.key === "ArrowUp" && showDropdown) {
      e.preventDefault();
      setSelectedIndex((prevIndex: any) => (prevIndex > 0 ? prevIndex - 1 : 0));
      setScrollIndex((prevScrollIndex) => Math.max(prevScrollIndex - 1, 0));
    } else if (
      (e.key === "Enter" || e.keyCode === 13) &&
      showDropdown &&
      selectedIndex !== -1
    ) {
      e.preventDefault();
      handleSelectedOption(filterDropdownList[selectedIndex], selectedIndex);
    }
  };
  const handleFieldChange = (e: any, index: any) => {
    setShowDropdown(true);
    setSelectedDropdownValue(e.target.value);
    const query = e.target.value;
    const updatedFilterList: any =
      SkillList?.length > 0 &&
      SkillList.filter((item: any) => {
        return item.name?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1;
      });

    setFilterDropdownList(updatedFilterList);
    setTechnical((prevTechnical: any) => {
      return prevTechnical.map((skills: any, i: any) => {
        if (
          skills?.technical_skills !== e.target.value ||
          skills?.language !== e.target.value
        ) {
          if (i === index && name === "technical_skills") {
            return {
              ...skills,
              technical_skills: e.target.value,
            };
          }
          if (i === index && name === "language") {
            return {
              ...skills,
              language: e.target.value,
            };
          }
          return skills;
        }
      });
    });

    console.log(technical, "technical in field change");
    handleKeyDown(e);
  };

  const HandleClientBlur = () => {
    if (!document.activeElement?.classList.contains("form-select")) {
      if (filterDropdownList?.length === 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }
  };

  console.log(filterDropdownList, "filter list in search");
  return (
    <div className="position-relative mt-3">
      <input
        type="text"
        name={name}
        className={styles.common_input_field}
        placeholder={placeholder}
        onBlur={HandleClientBlur}
        onChange={(e) => handleFieldChange(e, index)}
        onClick={handleDocumentClick}
        onMouseDown={handleShowDropdown}
        value={defaultValue}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
      />
      {showDropdown && (
        <ul className={`dropdown-ul-list `} ref={dropdownRef}>
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {SkillList?.length > 0 &&
                SkillList !== null &&
                SkillList.map((list: any, index: any) => (
                  <li
                    key={index}
                    onClick={() => handleSelectedOption(list, index)}
                    className="dropdown-list"
                  >
                    {list.name}
                  </li>
                ))}
            </>
          ) : (
            <>
              {filterDropdownList?.length > 0 &&
                filterDropdownList !== null &&
                filterDropdownList.map((name: any, i: any) => (
                  <li
                    key={i}
                    onMouseDown={(e) => {
                      handleSelectedOption(name, i);
                    }}
                    className={`dropdown-list ${
                      i === selectedIndex ? "selected" : ""
                    }`}
                  >
                    {name.name}
                  </li>
                ))}
            </>
          )}
        </ul>
      )}
      <div onClick={() => removeRow(index)}>
        {/* <DeleteIcon className={styles.delete_icon} /> */}
        <img src={delete_icon_img.src} alt='delete-icon'  className={`cursor ${styles.delete_icon}`}/>
      </div>
    </div>
  );
};

export default SearchSelectInputField;
