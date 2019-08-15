import { css } from 'lit-element';

/**
Common styles for API forms.

Custom property | Description | Default
----------------|-------------|----------
`--api-form-action-button-color` | Color of the action button in the form. Action buttons should perform form's primary actions like "submit" or "add new". Use `--api-form-action-icon-*` for icons related styling | `--secondary-button-color` or `--accent-color`
`--api-form-action-button-background-color` | Similar to `--api-form-action-button-color` but it's background color | `--secondary-button-background`
`--api-form-action-button-hover-color` | Color of the action button in the form when hovering. | `--secondary-button-color` or `--accent-color`
`--api-form-action-button-hover-background-color` | Similar to `--api-form-action-button-hover-color` but it's background color | `--secondary-button-background`
`--hint-trigger-color` | Color of the form action icon button to dispay documentation for the item. | `rgba(0, 0, 0, 0.74)`
`--hint-trigger-hover-color` | Color of the form action icon button to dispay documentation for the item when hovered | `rgba(0, 0, 0, 0.74)`
`--api-form-action-icon-color` | Color of any other than documentation icon button in form row | `--icon-button-color` or `rgba(0, 0, 0, 0.74)`
`--api-form-action-icon-hover-color` | Color of any other than documentation icon button in form row when hovering | `--accent-color` or `rgba(0, 0, 0, 0.88)`
`--inline-documentation-background-color` | Background color of the documentation element. | `#FFF3E0`
`--inline-documentation-color` | Color of the documentation element | `rgba(0, 0, 0, 0.87)`
`--inline-documentation-font-size` | Font size of the documentaiton element | `13px`
*/

export default css`
.form-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

:host([narrow]) .form-item,
.narrow .form-item {
  display: block;
}

.form-item[data-optional] {
  display: none;
}

:host([optionalopened]) [data-optional] {
  display: flex;
  flex-direction: row;
}
/* General action button like "add property" etc */
.action-button {
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
  margin: var(--api-form-action-button-margin-top, 0);
  color: var(--api-form-action-button-color, var(--secondary-button-color, var(--accent-color)));
  background-color: var(--api-form-action-button-background-color, var(--secondary-button-background));
}

.action-button:hover {
  color: var(--api-form-action-button-hover-color, var(--secondary-button-color, var(--accent-color)));
  background-color: var(--api-form-action-button-hover-background-color, var(--secondary-button-background));
}
/* Any icon element inside the action button should inherit the same styles */
.action-button .action-icon {
  margin-right: 12px;
  color: var(--api-form-action-button-color, var(--secondary-button-color, var(--accent-color)));
}

.action-button:hover .action-icon {
  color: var(--api-form-action-button-hover-color, var(--secondary-button-color, var(--accent-color)));
}

/* Icons that provide additional documentation to the form item */
.hint-icon {
  color: var(--hint-trigger-color, rgba(0, 0, 0, 0.74));
  transition: color 0.25s ease-in-out;
}

.hint-icon:hover {
  color: var(--hint-trigger-hover-color, var(--accent-color, rgba(0, 0, 0, 0.88)));
}
/* An icon in the form row that performs some action other than documentation. */
.action-icon {
  color: var(--api-form-action-icon-color, var(--icon-button-color, rgba(0, 0, 0, 0.74)));
  transition: color 0.2s ease-in-out;
}

.action-icon:hover {
  color: var(--api-form-action-icon-hover-color, var(--accent-color, rgba(0, 0, 0, 0.88)));
}
/* styling form inline markdown */
arc-marked {
  background-color: var(--inline-documentation-background-color, #FFF3E0);
  padding: 4px;
  /* Default inputs margin */
  margin: 0 8px;
}
/* wrapped for arc-marked */
.docs {
  font-size: var(--arc-font-body1-font-size);
  font-weight: var(--arc-font-body1-font-weight);
  line-height: var(--arc-font-body1-line-height);
  color: var(--inline-documentation-color, rgba(0, 0, 0, 0.87));
  margin-right: 40px;
}

.markdown-body * {
  font-size: var(--inline-documentation-font-size, 13px) !important;
}

.markdown-body p:first-child {
  margin-top: 0;
  padding-top: 0;
}

.markdown-body p:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
}`;
