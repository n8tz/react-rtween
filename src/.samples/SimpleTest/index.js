/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React                                        from "react";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";
import {pushIn, tweenAxis}                          from "./anims";
import "./sample.scss";


@asTweener({ enableMouseDrag: true })
export default class Sample extends React.Component {
	state = {
		count: 0
	};
	
	componentDidScroll( pos, axe ) {
		console.log('scroll', pos, axe)
		this.forceUpdate();// force update to show scroll pos
	}
	
	render() {
		return <div className={"SimpleTest"} style={{
			width : "100%",
			height: "100%"
		}}>
			<TweenAxis
				axe={"scrollY"}
				defaultPosition={100}
			/>
			<TweenAxis
				axe={"scrollX"}
				defaultPosition={100}
			/>
			hello ! {this.state.count} concurent anims <br/>
			scrollPos : <pre>{JSON.stringify(this.getAxisState(), null, 2)}</pre>
			<br/>y:
			<button onClick={e => this.scrollTo(0, 500)}>( go to 0 )</button>
			<button onClick={e => this.scrollTo(200, 500)}>( go to 200 )</button>
			<br/>x:
			<button onClick={e => this.scrollTo(0, 500, "scrollX")}>( go to 0 )</button>
			<button onClick={e => this.scrollTo(200, 500, "scrollX")}>( go to 200 )</button>
			
			<TweenRef
				id={"testItem"}
				initial={{
					position       : "absolute",
					display        : "inline-block",
					width          : "15em",
					height         : "15em",
					cursor         : "pointer",
					backgroundColor: "red",
					overflow       : "hidden",
					margin         : "-7.5em 0 0 -7.5em",
					top            : ".1box",
					left           : ".1box",
					transformOrigin: "50% 50%",
					
					transform: {
						translateZ: "0box",
						translateX: ".8box",
						translateY: ".8box",
						//rotateX   : -30,
						//rotateY   : 30,
						
						//rotateY: 180,
					}
				}}
				tweenLines={tweenAxis}
			>
				<div
					onClick={e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(tweenTools.target(pushIn, "testItem"),
						              () => {
							              this.setState({ count: this.state.count - 1 })
						              });
					}}
					style={{}}>
					<span>drag and/or click me !</span>
				</div>
			</TweenRef>
		</div>;
	}
}