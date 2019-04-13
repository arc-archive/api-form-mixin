import '../../@polymer/polymer/polymer-element.js';
const $documentContainer = document.createElement('template');

/**
Common styles for API forms.

Custom property | Description | Default
----------------|-------------|----------
`--api-form-row` | Mixin applied to API form rows. Each row already applies `--layout-horizontal` and `--layout-start` | `{}`
`--api-form-row-narrow` | Mixin applied to API form rows when `narrow` property is set | `{}`
`--api-form-row-optional` | Mixin applied to optional row of the form (not required). By default this form row is hidden from the view | `{}`
`--api-form-row-optional-visible` | Mixin applied to optional row of the form when it becomes visible | `{}`
`--api-form-action-button-color` | Color of the action button in the form. Action buttons should perform form's primary actions like "submit" or "add new". Use `--api-form-action-icon-*` for icons related styling | `--secondary-button-color` or `--accent-color`
`--api-form-action-button-background-color` | Similar to `--api-form-action-button-color` but it's background color | `--secondary-button-background`
`--secondary-button` | Mixin applied to the action button. This is more general theme element. This values can be overriten by `--api-form-action-button` | `{}`
`--api-form-action-button` | Mixin applied to the action button | `{}`
`--api-form-action-button-hover-color` | Color of the action button in the form when hovering. | `--secondary-button-color` or `--accent-color`
`--api-form-action-button-hover-background-color` | Similar to `--api-form-action-button-hover-color` but it's background color | `--secondary-button-background`
`--secondary-button-hover` | Mixin applied to the action button when hovered. This is more general theme element. This values can be overriten by `--api-form-action-button` | `{}`
`--api-form-action-button-hover` | Mixin applied to the action button when hovered. | `{}`
`--hint-trigger-color` | Color of the form action icon button to dispay documentation for the item. | `rgba(0, 0, 0, 0.74)`
`--icon-button` | Mixin applied to the icon button to dispay documentation for the item | `{}`
`--hint-trigger-hover-color` | Color of the form action icon button to dispay documentation for the item when hovered | `rgba(0, 0, 0, 0.74)`
`--icon-button-hover` | Mixin applied to the icon button to dispay documentation for the item when hovered | `{}`
`--api-form-action-icon-color` | Color of any other than documentation icon button in form row | `--icon-button-color` or `rgba(0, 0, 0, 0.74)`
`--api-form-action-icon-hover-color` | Color of any other than documentation icon button in form row when hovering | `--accent-color` or `rgba(0, 0, 0, 0.88)`
`--inline-documentation-background-color` | Background color of the documentation element. | `#FFF3E0`
`--inline-documentation-color` | Color of the documentation element | `rgba(0, 0, 0, 0.87)`
`--inline-documentation-font-size` | Font size of the documentaiton element | `13px`
*/

$documentContainer.innerHTML = `<dom-module id="api-form-styles">
  <template>
    <style>
    .form-item {
      @apply --layout-horizontal;
      @apply --layout-start;
      @apply --api-form-row;
    }

    :host([narrow]) .form-item,
    .narrow .form-item {
      display: block;
      @apply --api-form-row-narrow;
    }

    .form-item[data-optional] {
      display: none;
      @apply --api-form-row-optional;
    }

    :host([optional-opened]) [data-optional] {
      @apply --layout-horizontal;
      @apply --api-form-row-optional-visible;
    }
    /* General action button like "add property" etc */
    .action-button {
      transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
      margin: var(--api-form-action-button-margin-top, 0);
      color: var(--api-form-action-button-color, var(--secondary-button-color, var(--accent-color)));
      background-color: var(--api-form-action-button-background-color, var(--secondary-button-background));
      @apply --secondary-button;
      @apply --api-form-action-button;
    }

    .action-button:hover {
      color: var(--api-form-action-button-hover-color, var(--secondary-button-color, var(--accent-color)));
      background-color: var(--api-form-action-button-hover-background-color, var(--secondary-button-background));
      @apply --secondary-button-hover;
      @apply --api-form-action-button-hover;
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
      @apply --icon-button;
    }

    .hint-icon:hover {
      color: var(--hint-trigger-hover-color, var(--accent-color, rgba(0, 0, 0, 0.88)));
      @apply --icon-button-hover;
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
    marked-element {
      background-color: var(--inline-documentation-background-color, #FFF3E0);
      padding: 4px;
    }
    /* wrapped for \`marked-element\` */
    .docs {
      @apply --arc-font-body1;
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
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($documentContainer.content);
