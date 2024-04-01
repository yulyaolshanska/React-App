import React, { useState, useEffect, useRef } from "react";
import styles from "./DropDown.module.scss";

interface DropDownProps {
  onAddClick?: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  mode: "list" | "task";
}

const DropDown: React.FC<DropDownProps> = ({
  onEditClick,
  onDeleteClick,
  onAddClick,
  mode,
}) => {
  const [isShowListMenu, setIsShowListMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    setIsShowListMenu((prev) => !prev);
  };

  const handleEdit = () => {
    onEditClick();
    setIsShowListMenu(false);
  };

  const handleAddCart = (): void => {
    if (onAddClick) {
      onAddClick();
    }
    setIsShowListMenu(false);
  };

  const handleDelete = (): void => {
    onDeleteClick();
    setIsShowListMenu(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsShowListMenu(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsShowListMenu(false);
    }
  };

  useEffect(() => {
    if (isShowListMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isShowListMenu]);

  return (
    <div ref={menuRef} className={styles.menuContainer}>
      <button type="button" onClick={handleShowMenu} className={styles.menuBtn}>
        ...
      </button>
      {isShowListMenu && (
        <div className={styles.listMenu}>
          <button
            type="button"
            onClick={() => handleEdit()}
            className={styles.listMenuItem}
          >
            Edit
          </button>
          {mode === "list" && (
            <button
              type="button"
              onClick={() => handleAddCart()}
              className={styles.listMenuItem}
            >
              Add new card
            </button>
          )}
          <button
            type="button"
            onClick={() => handleDelete()}
            className={styles.listMenuItem}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
