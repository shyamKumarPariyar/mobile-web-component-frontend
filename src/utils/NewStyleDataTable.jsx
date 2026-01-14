import { defaultThemes } from "react-data-table-component"

const newStyle = {
    rows: {
        style : {
            fontSize: '15px',
            fontFamily: '"Oswald", sans-serif',
            fontWeight: '300',
        }
    },
    header: {
		style: {
			minHeight: '56px',
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
		},
	},
    headCells: {
        style: {
            fontSize: '13px',
            fontFamily: '"Oswald", sans-serif'
        },
    },
    cells: {
        style : {
            fontSize: '15px',
            fontFamily: '"Oswald", sans-serif',
            fontWeight: '300',
            paddingLeft: '5px',
            paddingRight: '5px'
        }
    },
}

export default newStyle