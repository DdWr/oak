/**
 * @jsx React.DOM
 */

/*
    Passport Parking Code Test
    Author: David Weber
    October 8, 2014

    This our React.js script. It is the crux of the visualization,
    and generates components from the data passed into and through it.
 */

var React = require('react');

var Child = React.createClass({
	render: function() {
	    return (
	    	<div className="node child">
	    		<span className="child label">{this.props.name}</span>
	    	</div>
	    );
	}
});

var ChildList = React.createClass({
	render: function() {
		var childNodes = null;
		var counter = 0;
		if (this.props.data) {
			childNodes = this.props.data.map(function (child) {
				counter++;
				return (
					<Child key={counter} value={child.value} name={child.name}/>
				);
    		});
		}
	    return (
			<div className="children childList">
				{childNodes}
			</div>
	    );
	}
});

var Factory = React.createClass({
	componentDidMount: function() {
		console.log("Factory name", this.props.name)
	},
	componentWillUnmount: function() {
		console.log("Deleted factory", this.props.name);
	},
	render: function() {
	    return (
	    	<div className="factory node">
	    		<div className="factory front" data-id={this.props.id}>
	    			<div className='blk-2'>
		    			<i className="toggle fa fa-folder-open" />
		    			<span className="factory label input name">{this.props.name}</span>
	    				<span className="factory bounds">
			    			[<span data-id={this.props.id} className="input bound lowerBound">{this.props.lower}</span>
			    			,<span data-id={this.props.id} className="input bound upperBound">{this.props.upper}</span>]
		    			</span>
	    			</div>
	    			<div className='blk-2 blk-ctrl'>
		    			<div className="factory ctrl">
							<button data-id={this.props.id} className="delete ctrl">
								<i className="ctrl fa fa-trash" />
							</button>
							<button className="edit ctrl">
								<i className="ctrl fa fa-pencil" />
							</button>
							<button data-id={this.props.id} className="generate ctrl">
								<i className="ctrl fa fa-play" />
							</button>
							<button className="save yes modify" style={{"display": "none"}}>
								Save
							</button>
							<button className="cancel no modify" style={{"display": "none"}}>
								Cancel
							</button>
						</div>
					</div>
	    		</div>
	    		<ChildList data={this.props.children} />
	    	</div>
	    );
	}
});


var FactoryList = React.createClass({
	render: function() {
		var factoryNodes = null;
		var counter = 0;
		if (this.props.data) {
			factoryNodes = this.props.data.map(function (factory) {
				counter++;
				return (
					<Factory key={counter} upper={factory.upper} lower={factory.lower} id={factory.id} name={factory.name} children={factory.children} />
				);
    		});
		}
	    return (
			<div className="children factoryList">
				{factoryNodes}
			</div>
	    );
	}
});

var Root = React.createClass({
	render: function() {
	    return (
	    	<div id={this.props.id} className="root node">
				<div className="root front" data-id={this.props.id}>
					<div className='blk-2'>
						<i className="toggle fa fa-folder-open" />
						<span className="root label input name">{this.props.name}</span>
					</div>
					<div className='blk-2 blk-ctrl'>
						<div className="root ctrl">
							<button data-id={this.props.id} className="delete ctrl">
								<i className="ctrl fa fa-trash" />
							</button>
							<button className="edit ctrl">
								<i className="ctrl fa fa-pencil" />
							</button>
							<button className="add ctrl">
								<i className="ctrl fa fa-plus" />
							</button>
							<button className="save yes modify" style={{"display": "none"}}>
								Save
							</button>
							<button className="cancel no modify" style={{"display": "none"}}>
								Cancel
							</button>
						</div>
					</div>
				</div>
				<FactoryList data={this.props.children} />
	      </div>
	    );
	}
});

var RootList = React.createClass({
	componentDidMount: function() {
		this.setState({data: this.props.data});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		var rootNodes = null;
		var counter = 0;
		if (this.state.data) {
			rootNodes = this.state.data.map(function (root) {
				counter++;
				return (
					<Root id={root.id} key={counter} name={root.name} children={root.children} />
				);
    		});
		}
	    return (
			<div className="rootList">
				{rootNodes}
			</div>
	    );
	}
});

module.exports = RootList;