import clsx from 'clsx';
import { useMemo, useState } from 'react';

export default function AutocompleteInput({
  name,
  registerReturn,
  setValue = null,
  suggestions = [],
  onInputChange = null,
  placeholder = '',
  className = '',
  maxSuggestions = 25,
  buildSelectedValue = null,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');

  const visibleSuggestions = useMemo(() => suggestions.slice(0, maxSuggestions), [suggestions, maxSuggestions]);
  const showMenu = isMenuOpen && visibleSuggestions.length > 0;

  const selectSuggestion = (value) => {
    const nextValue = typeof buildSelectedValue === 'function'
      ? buildSelectedValue(inputValue, value)
      : value;

    if (setValue) {
      setValue(name, nextValue, {
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      registerReturn.onChange({
        target: {
          name,
          value: nextValue,
        },
        type: 'change',
      });
    }

    setInputValue(nextValue);
    onInputChange?.(nextValue);
    setIsMenuOpen(false);
    setActiveOptionIndex(-1);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={showMenu}
        placeholder={placeholder}
        {...registerReturn}
        onChange={(event) => {
          setInputValue(event.target.value);
          registerReturn.onChange(event);
          onInputChange?.(event.target.value);
          setIsMenuOpen(true);
          setActiveOptionIndex(-1);
        }}
        onFocus={(event) => {
          setInputValue(event.target.value);
          onInputChange?.(event.target.value);
          setIsMenuOpen(true);
        }}
        onBlur={() => {
          // Delay close to allow option click via mouse.
          window.setTimeout(() => {
            setIsMenuOpen(false);
            setActiveOptionIndex(-1);
          }, 120);
        }}
        onKeyDown={(event) => {
          if (visibleSuggestions.length === 0) return;

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIsMenuOpen(true);
            setActiveOptionIndex((prev) => {
              const next = prev + 1;
              return next >= visibleSuggestions.length ? 0 : next;
            });
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIsMenuOpen(true);
            setActiveOptionIndex((prev) => {
              if (prev <= 0) return visibleSuggestions.length - 1;
              return prev - 1;
            });
          }

          if (event.key === 'Enter' && activeOptionIndex >= 0) {
            event.preventDefault();
            selectSuggestion(visibleSuggestions[activeOptionIndex]);
          }

          if (event.key === 'Escape') {
            setIsMenuOpen(false);
            setActiveOptionIndex(-1);
          }
        }}
        className={clsx(
          'border dark:border-gray-700',
          'dark:bg-gray-900 bg-white',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'p-2 w-full h-8',
          'text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-600',
          'rounded',
          className
        )}
      />

      {showMenu ? (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-lg max-h-72 overflow-y-auto">
          {visibleSuggestions.map((value, optionIndex) => {
            const isActive = optionIndex === activeOptionIndex;
            return (
              <button
                key={`${value}-${optionIndex}`}
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  selectSuggestion(value);
                }}
                className={clsx(
                  'w-full px-3 py-2 text-left text-xs',
                  'text-gray-900 dark:text-gray-100',
                  'hover:bg-blue-50 dark:hover:bg-blue-900/40',
                  isActive ? 'bg-blue-50 dark:bg-blue-900/40' : ''
                )}
              >
                {value}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
