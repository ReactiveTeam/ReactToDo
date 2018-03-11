// Core
import React, { Component } from 'react';
import { number } from 'prop-types';

const transformSVG = (
    Injectable,
    { viewBoxWidth = 0, viewBoxHeight = 0, width = 0, height = 0 } = {},
) =>
    class SVG extends Component {
        static propTypes = {
            height: number.isRequired,
            width:  number.isRequired,
        };

        static defaultProps = {
            color1: '#f00',
            width,
            height,
        };

        constructor () {
            super();

            this.getInjectableProps = ::this._getInjectableProps;
            this.getSvgStyle = ::this._getSvgStyle;
        }

        state = {
            hover:   false,
            checked: false,
        };

        componentDidMount () {
            Object.entries(this.props).forEach(([key, value]) => {
                if (/^color[\d]$/.test(key)) {
                    if (!(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(value)) {
                        throw new Error(`The HEX color value passed invalid: ${value}`);
                    }
                }
            });
        }

        _getInjectableProps () {
            const injectableProps = Object.assign({}, this.state, this.props);

            delete injectableProps.width;
            delete injectableProps.height;

            return injectableProps;
        }

        _getSvgStyle () {
            const { width: w, height: h } = this.props;

            return Object.assign({}, { width: w, height: h });
        }

        handleDeleteTodoMouseEnter = () =>
            this.setState(() => ({
                hover: true,
            }));

        handleDeleteTodoMouseLeave = () =>
            this.setState(() => ({
                hover: false,
            }));

        handleClick = () =>
            this.setState(({ checked }) => ({
                checked: !checked,
            }));

        render () {
            const svgStyle = this.getSvgStyle();
            const injectableProps = this.getInjectableProps();

            return (
                <span
                    style = { {
                        lineHeight: 0,
                    } }
                    onClick = { this.props.onClick || this.handleClick }
                    onMouseEnter = { this.handleDeleteTodoMouseEnter }
                    onMouseLeave = { this.handleDeleteTodoMouseLeave }>
                    <svg
                        style = { svgStyle }
                        version = '1.1'
                        viewBox = { `0 0 ${viewBoxWidth} ${viewBoxHeight}` }>
                        <Injectable { ...injectableProps } />
                    </svg>
                </span>
            );
        }
    };

export default (config) => (Injectable) => transformSVG(Injectable, config);
