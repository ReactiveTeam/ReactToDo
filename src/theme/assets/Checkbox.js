// Core
import React, { Component } from 'react';
import type from 'prop-types';

// Imstruments
import transform from './Svg';

class Checkbox extends Component {
    static propTypes = {
        checked: type.bool.isRequired,
        onClick: type.func.isRequired,
    }

    render () {
        const {
            checked,
            color1 = '#e4e4e4', //FIXME: Hardcoded from $paletteColor8
            color2 = '#656565', //FIXME: Hardcoded from $paletteColor9
            // Handlerss
            onClick,
        } = this.props;

        const fill = checked ? color1 : color2;

        return (
            <g onClick = { onClick }>
                <rect
                    fill = { fill }
                    height = '25'
                    rx = '5'
                    ry = '5'
                    stroke = { color1 }
                    style = { { strokeWidth: 2 } }
                    width = '25'
                    x = '1'
                    y = '1'
                />
                <path
                    d = 'M22.12 6c-3.12 3.16-6.84 6.36-10.23 9.64l-5.42-4.05L4 14.84l6.78 5.08L12.23 21l1.25-1.25C17 16.2 21.29 12.6 25 8.89z'
                    fill = { color2 }
                />
            </g>
        );
    }
}

export default transform({ viewBoxWidth: 27, viewBoxHeight: 27, width: 25, height: 25 })(Checkbox);
