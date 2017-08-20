import { Action } from '@ngrx/store'

export const ACTIVATE_FOOTER = '[Ui] ActivateFooter'
export const DEACTIVATE_FOOTER = '[Ui] DeactivateFooter'

export const ACTIVATE_HEADER = '[Ui] ActivateHeader'
export const DEACTIVATE_HEADER = '[Ui] DeactivateHeader'

export const ACTIVATE_SIDEBAR = '[Ui] ActivateSidebar'
export const DEACTIVATE_SIDEBAR = '[Ui] DeactivateSidebar'
export const TOGGLE_SIDEBAR = '[Ui] ToggleSidebar'

export const ACTIVATE_MOREBAR = '[Ui] ActivateMorebar'
export const DEACTIVATE_MOREBAR = '[Ui] DeactivateMorebar'
export const TOGGLE_MOREBAR = '[Ui] ToggleMorebar'

export class ActivateFooter implements Action {
  public readonly type = ACTIVATE_FOOTER
  constructor() { }
}

export class DeactivateFooter implements Action {
  public readonly type = DEACTIVATE_FOOTER
  constructor() { }
}

export class ActivateHeader implements Action {
  public readonly type = ACTIVATE_HEADER
  constructor() { }
}

export class DeactivateHeader implements Action {
  public readonly type = DEACTIVATE_HEADER
  constructor() { }
}

export class ActivateSidebar implements Action {
  public readonly type = ACTIVATE_SIDEBAR
  constructor() { }
}

export class DeactivateSidebar implements Action {
  public readonly type = DEACTIVATE_SIDEBAR
  constructor() { }
}

export class ToggleSidebar implements Action {
  public readonly type = TOGGLE_SIDEBAR
  constructor() { }
}

export class ActivateMorebar implements Action {
  public readonly type = ACTIVATE_MOREBAR
  constructor() { }
}

export class DeactivateMorebar implements Action {
  public readonly type = DEACTIVATE_MOREBAR
  constructor() { }
}

export class ToggleMorebar implements Action {
  public readonly type = TOGGLE_MOREBAR
  constructor() { }
}

export type Actions =
  | ActivateFooter
  | DeactivateFooter
  | ActivateHeader
  | DeactivateHeader
  | ActivateSidebar
  | DeactivateSidebar
  | ToggleSidebar
  | ActivateMorebar
  | DeactivateMorebar
  | ToggleMorebar
