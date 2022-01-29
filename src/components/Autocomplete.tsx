import React, { forwardRef } from 'react'
import { Paper, List, ListItem } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

export type TAutocompleteItem = {
    keys: string[]
    value: any
    content: string | JSX.Element
}

interface TAutocompleteProps extends WithStyles<typeof styles> {
    editorId: string
    items: TAutocompleteItem[]
    top: number | 'unset'
    bottom: number | 'unset'
    left: number | 'unset'
    right: number | 'unset'
    selectedIndex: number
    onClick: (selectedIndex: number) => void
}

const styles = () => createStyles({
    autocomplete: {
        minWidth: "200px",
        overflow: "auto",
        position: "absolute",
        zIndex: 10
    },
    item: {
        cursor: "pointer"
    }
})

const Autocomplete: React.ForwardRefRenderFunction<HTMLDivElement, TAutocompleteProps> = (props, ref) => {
    if (!props.items.length) {
        return null
    }

    const { classes } = props
    return (
        <Paper id={`${props.editorId}-autocomplete`} className={classes.autocomplete} style={{
            top: props.top,
            left: props.left,
            bottom: props.bottom,
            right: props.right,
        }} ref={ref}>
            <List dense={true}>
                {props.items.map((item, index) => (
                    <ListItem
                        key={index}
                        className={classes.item}
                        selected={index === props.selectedIndex}
                        onClick={() => props.onClick(index)}
                    >
                        {item.content}
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default withStyles(styles, { withTheme: true })(forwardRef(Autocomplete))
