// import Color, {UIColor} from 'Color'

import css from 'modules/@style/css'
import { styleq } from 'styleq'

export const RList = {
    PointerEventsNone: css`
        .PointerEventsNone {
            pointer-events: none !important;
        }
    `,
    PointerEventsAuto: css`
        .PointerEventsNone {
            pointer-events: auto !important;
        }
    `,
    PointerEventsAll: css`
        .PointerEventsNone {
            pointer-events: all !important;
        }
    `,
    PointerEventsBoxOnly: css`
        .PointerEventsBoxOnly {
            pointer-events: auto !important;
        }
        .PointerEventsBoxOnly > * {
            pointer-events: none;
        }
    `,
    PointerEventsBoxNone: css`
        .PointerEventsBoxNone {
            pointer-events: none !important;
        }
        .PointerEventsBoxNone > * {
            pointer-events: auto;
        }
    `,
    TouchNone: css`
        .TouchNone {
            touch-action: none;
        }
    `,
    TouchManipulation: css`
        .TouchManipulation {
            touch-action: manipulation;
        }
    `,
    TouchPanX: css`
        .TouchPanX {
            touch-action: pan-x;
        }
    `,
    TouchPanY: css`
        .TouchPanY {
            touch-action: pan-y;
        }
    `,
    TouchInherit: css`
        .TouchInherit {
            touch-action: inherit;
        }
    `,
    Inert: css`
        .Inert {
            user-select: none !important;
            -webkit-user-select: none !important;
            -webkit-user-drag: none !important;
            -webkit-user-modify: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
            pointer-events: none;
        }
    `,
    Selectable: css`
        .Selectable {
            user-select: text !important;
            -webkit-user-select: text !important;
            touch-action: pan-x pan-y;
            pointer-events: auto;
        }
    `,
    EaseInertial: css`
        .EaseInertial {
            transition-timing-function: cubic-bezier(0.42, 0, 1, 1);
        }
    `,
    ScrollbarNone: css`
        .ScrollbarNone::-webkit-scrollbar {
            display: none;
        }
        .ScrollbarNone {
            scrollbar-width: none;
        }
    `,
    DisplayContents: css`
        .DisplayContents {
            display: contents !important;
        }
    `,
    Fixed: css`
        .Fixed {
            position: fixed;
            top: 0px;
            left: 0px;
        }
    `,
    Absolute: css`
        .Absolute {
            position: absolute;
            top: 0px;
            left: 0px;
        }
    `,
    Relative: css`
        .Relative {
            position: relative;
            top: 0px;
            left: 0px;
        }
    `,
    ContainSize: css`
        .ContainSize {
            contain: size;
        }
    `,
    ContainPaint: css`
        .ContainPaint {
            contain: paint;
        }
    `,
    ContainLayout: css`
        .ContainLayout {
            contain: layout;
        }
    `,
    HStack: css`
        .HStack {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    `,
    VStack: css`
        .VStack {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }
    `,
}

// console.log(
//     Object.keys(RList)
//         .map((s) => `${s}: '${s}',`)
//         .join('\n'),
// )
export const R = {
    PointerEventsNone: 'PointerEventsNone',
    PointerEventsAuto: 'PointerEventsAuto',
    PointerEventsAll: 'PointerEventsAll',
    PointerEventsBoxOnly: 'PointerEventsBoxOnly',
    PointerEventsBoxNone: 'PointerEventsBoxNone',
    TouchNone: 'TouchNone',
    TouchManipulation: 'TouchManipulation',
    TouchPanX: 'TouchPanX',
    TouchPanY: 'TouchPanY',
    TouchInherit: 'TouchInherit',
    Inert: 'Inert',
    Selectable: 'Selectable',
    EaseInertial: 'EaseInertial',
    ScrollbarNone: 'ScrollbarNone',
    DisplayContents: 'DisplayContents',
    Fixed: 'Fixed',
    Absolute: 'Absolute',
    Relative: 'Relative',
    ContainSize: 'ContainSize',
    ContainPaint: 'ContainPaint',
    ContainLayout: 'ContainLayout',
    HStack: 'HStack',
    VStack: 'VStack',
}

// console.log(styleq([{Eas}, RList.Inert]))
