import React, { Component } from 'react'



class Dashboard extends Component {
 
  render() {

    return (
     <div>
		 {/* <!-- Navigation--> */}
<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-top-nav" id="mainNav">
	<a class="navbar-brand" href="index.html">
		<img src="assets/img/logo.png" width="184" class="" alt=""/>
	</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav navbar-sidenav bg-color-first" id="exampleAccordion">
			
			<li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-plus" aria-hidden="true"></i>
					<span class="nav-link-text">ADD INVOICE</span>
				</a>
			</li>
			
			<li class="nav-item active" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-home" aria-hidden="true"></i>
					<span class="nav-link-text">DASHBOARD</span>
				</a>
			</li>            
			
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
				<a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#mfl01" data-parent="#exampleAccordion">
					<i class="fa fa-cubes" aria-hidden="true"></i>
					<span class="nav-link-text">BILDER</span>
				</a>
                <ul class="sidenav-second-level collapse" id="mfl01">
                    <li>
						<a href="navbar.html">Menu Second Level</a>
					</li>                    
                    <li>
						<a class="nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti2">Menu Second Level</a>
                        <ul class="sidenav-third-level collapse" id="collapseMulti2">
                            <li>
								<a href="#">Menu Third Level</a>
							</li>
                            <li>
								<a href="#">Menu Third Level</a>
							</li>
                            <li>
								<a href="#">Menu Third Level</a>
							</li>
                        </ul>
                    </li>
					<li>
						<a href="cards.html">Menu Second Level</a>
					</li>
                </ul>
            </li>
			
			<li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-database" aria-hidden="true"></i>
					<span class="nav-link-text">MANAGE</span>
				</a>
			</li>
			
			<li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-laptop" aria-hidden="true"></i>
					<span class="nav-link-text">QUOTE</span>
				</a>
			</li>
			
			<li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-credit-card" aria-hidden="true"></i>
					<span class="nav-link-text">ORDERS &amp; PAYMENTS</span>
				</a>
			</li>
			
			<li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-calendar" aria-hidden="true"></i>
					<span class="nav-link-text">APOINTMENT CALENDER</span>
				</a>
			</li>
			
			<li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-newspaper-o" aria-hidden="true"></i>
					<span class="nav-link-text">REPORT</span>
				</a>
			</li>
			<li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
				<a class="nav-link" href="index.html">
					<i class="fa fa-newspaper-o" aria-hidden="true"></i>
					<span class="nav-link-text">CRM</span>
				</a>
			</li>
			
        </ul>
        {/* <!--<ul class="navbar-nav sidenav-toggler">
            <li class="nav-item">
				<a class="nav-link text-center" id="sidenavToggler">
					<i class="fa fa-fw fa-angle-left"></i>
				</a>
			</li>
        </ul>--> */}
        <ul class="navbar-nav ml-auto no-border" >
            
            <li class="nav-item">
                <form class="form-inline my-2 my-lg-0 mr-lg-2">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Search for..."/>
                        <span class="input-group-btn">
                        <button class="btn btn-primary" type="button"> <i class="fa fa-search"></i> </button>
                        </span>
					</div>
                </form>
            </li>
			
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="fa fa-fw fa-bell"></i>
					<span class="d-lg-none">Alerts <span class="badge badge-pill badge-warning">6 New</span></span>
					<span class="indicator d-none d-lg-block">6</span>
				</a>
                <div class="dropdown-menu" aria-labelledby="alertsDropdown">
                    <h6 class="dropdown-header">New Alerts:</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <span class="text-success"> <strong> <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong> </span> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <span class="text-danger"> <strong> <i class="fa fa-long-arrow-down fa-fw"></i>Status Update</strong> </span> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <span class="text-success"> <strong> <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong> </span> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item small" href="#">View all alerts</a> </div>
            </li>
			
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="fa fa-fw fa-envelope"></i>
					<span class="d-lg-none">Messages <span class="badge badge-pill badge-primary">12 New</span></span>
					<span class="indicator d-none d-lg-block">12</span>
				</a>
                <div class="dropdown-menu" aria-labelledby="messagesDropdown">
                    <h6 class="dropdown-header">New Messages:</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <strong>David Miller</strong> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <strong>Jane Smith</strong> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <strong>John Doe</strong> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item small" href="#">View all messages</a> </div>
            </li>
            
			
			
            {/* <!--<li class="nav-item">
				<a class="nav-link" data-toggle="modal" data-target="#exampleModal">
					<i class="fa fa-fw fa-sign-out"></i>
					<span>Logout</span>
				</a>
			</li>--> */}
        </ul>
		<ul class="navbar-nav ml-auto navbar-right no-border">
			
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle mr-lg-2" id="setingsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="fa fa-cog" aria-hidden="true"></i>
					<span class="">
						<span>My Account</span>
					</span>
				</a>
                <div class="dropdown-menu" aria-labelledby="setingsDropdown">
                    <h6 class="dropdown-header">New Alerts:</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <span class="text-success"> <strong> <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong> </span> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <span class="text-danger"> <strong> <i class="fa fa-long-arrow-down fa-fw"></i>Status Update</strong> </span> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <span class="text-success"> <strong> <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong> </span> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item small" href="#">View all alerts</a> </div>
            </li>
			
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle mr-lg-2" id="accountDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<img src="assets/img/avatar128x128.jpg" style={{marginTop: "3px"}} width="28" height="28" class="avatar" alt=""/>
					<span class="user">
						<span class="user-name">User Name</span>
						<span class="designation"><small>Designation</small></span>
					</span>
				</a>
                <div class="dropdown-menu" aria-labelledby="accountDropdown">
                    <h6 class="dropdown-header">New Messages:</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <strong>David Miller</strong> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <strong>Jane Smith</strong> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> <strong>John Doe</strong> <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item small" href="#">View all messages</a> </div>
            </li>
            
        </ul>
    </div>
</nav>
<div class="content-wrapper">
    <div class="container-fluid">
{/* 		
		<!--Body Header Menu--> */}
		<div class="row">
			<div class="col-sm-12 pad20B">
				<div class="body-top-menu-container" align="center">
					<ul>
						<li><a href="#" class="bg-color-first">Clients</a></li>
						<li><a href="#" class="bg-color-first">Orders</a></li>
						<li><a href="#" class="bg-color-first">Billing</a></li>
						<li><a href="#" class="bg-color-first">Support</a></li>
						<li><a href="#" class="bg-color-first">Reports</a></li>
						<li><a href="#" class="bg-color-first">Utilities</a></li>
						<li><a href="#" class="bg-color-first">Addons</a></li>
						<li><a href="#" class="bg-color-first">Setup</a></li>
						<li><a href="#" class="bg-color-first">Help</a></li>
					</ul>
				</div>
			</div>
		</div>
		
        {/* <!-- Breadcrumbs--> */}
        <ol class="breadcrumb">
            <li class="breadcrumb-item"> <a href="#">Dashboard</a> </li>
            <li class="breadcrumb-item active"><span>Product</span></li>
        </ol>
        
        {/* <!--Body Contant--> */}
        
		<div class="row">
			<div class="col-lg-8">
				<div class="row">
					<div class="col-sm-6 mrg30B">
						<div class="well-container">
							<div class="row row-table">
								<div class="col-xs-4 bg-color-first text-center">
									<em class="fa fa-users fa-2x"></em>
								</div>
								<div class="col-xs-8">
									<div class="panel-body text-center">
										<div class="top text-color-first">Pending Orders</div>
										<div class="bot">10</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-6 mrg30B">
						<div class="well-container">
							<div class="row row-table">
								<div class="col-xs-4 bg-color-second text-center">
									<em class="fa fa-users fa-2x"></em>
								</div>
								<div class="col-xs-8">
									<div class="panel-body text-center">
										<div class="top text-color-second">Pending Orders</div>
										<div class="bot">10</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-6 mrg30B">
						<div class="well-container">
							<div class="row row-table">
								<div class="col-xs-4 bg-color-third text-center">
									<em class="fa fa-users fa-2x"></em>
								</div>
								<div class="col-xs-8">
									<div class="panel-body text-center">
										<div class="top text-color-third">Pending Orders</div>
										<div class="bot">10</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-6 mrg30B">
						<div class="well-container">
							<div class="row row-table">
								<div class="col-xs-4 bg-color-fourth text-center">
									<i class="fa fa-users fa-2x"></i>
								</div>
								<div class="col-xs-8">
									<div class="panel-body text-center">
										<div class="top text-color-fourth">Pending Orders</div>
										<div class="bot">10</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="row">
					<div class="col-sm-12">
						<div class="well-container pad15B mrg30B">
							<div class="header">
								<span>Billing</span>
							</div>
							<div class="row-nth pad15L pad15R">
								<div class="col-sm-6">
									<div class="billing-text-container">
										<div class="top text-color-first">$03.00</div>
										<div class="bot">Today</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="billing-text-container">
										<div class="top text-color-second">$36.25</div>
										<div class="bot">This Month</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="billing-text-container">
										<div class="top text-color-third">$121.82</div>
										<div class="bot">This Year</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="billing-text-container">
										<div class="top text-color-fourth">$243.39</div>
										<div class="bot">All Time</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>		        
	</div>
	<div class="container-fluid" style={{display: "inline-block"}}>
		<div class="row">			
			<div class="col-lg-8">
				<div class="row">
					<div class="col-sm-12 mrg30B">
						<div class="well-container pad15B">
							<div class="header">
								<span>Orders &amp; Payments</span>
							</div>
							<div class="mater">
								<div id="orderAndPayment" class="col-md-12"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-4 mrg30B">
				<div class="row">
					<div class="col-lg-12 col-md-6 col-sm-6 mrg30B">
						<div class="well-container pad15B">
							<div class="header">
								<span>Weekly  Income Status </span>
							</div>
							<div class="mater weekly-status">
								<div class="heading text-color-second" align="center">$4,612</div>
								<div class="progress">
									<div class="progress-bar bg-color-third" role="progressbar" aria-valuenow="70"
									aria-valuemin="0" aria-valuemax="100" style={{width:"70%"}}>
										<span class="sr-only">70% Complete</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-6">
										<div class="top text-color-fourth">Totale Income :</div>
										<div class="bot">$234.35</div>
									</div>
									<div class="col-sm-6" align="right">
										<div class="status up">20.56%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-md-6 col-sm-6">
						<div class="well-container pad15B">
							<div class="header">
								<span>Weekly  Income Status </span>
							</div>
							<div class="mater weekly-status">
								<div class="heading text-color-first" align="center">$4,612</div>
								<div class="progress">
									<div class="progress-bar bg-color-fourth" role="progressbar" aria-valuenow="70"
									aria-valuemin="0" aria-valuemax="100" style={{width:"70%"}}>
										<span class="sr-only">70% Complete</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-6">
										<div class="top text-color-third">Totale Income :</div>
										<div class="bot">$234.35</div>
									</div>
									<div class="col-sm-6" align="right">
										<div class="status dn">20.56%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid" style={{display: "inline-block"}}>
		<div class="row">
			<div class="col-sm-12 pad15B">
				<div class="well-container pad15B">
					<div class="header mrg0B">
						<span>Customer Ratings</span>
						<span class="pull-right"><small>Total 2,45,567 Votes</small></span>
					</div>
					<div class="mater">
						<div class="col-md-12 border-bottom">
							<div class="row row-eq-height">
								<div class="col-sm-3 col-xs-8 border-right pad5B pad5T">
									<span class="t-icon">										
										<svg class="svg-first-color" width="18" height="18" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style={{background:"new 0 0 512 512;", whiteSpace: "normal"}}>
											<path d="M256,512c141.392,0,256-114.608,256-256S397.392,0,256,0S0,114.608,0,256S114.608,512,256,512z    M256,32c123.52,0,224,100.48,224,224S379.52,480,256,480S32,379.52,32,256S132.48,32,256,32z"/>
											<path d="M256,407.008c63.712,0,115.36-51.648,115.36-115.36H140.64   C140.64,355.344,192.288,407.008,256,407.008z"/>
											<circle cx="164.736" cy="183.152" r="44.56"/>
											<circle cx="347.264" cy="183.152" r="44.56"/>

										</svg>
									</span>
									<span class="t-text">The product is Awesome</span>
								</div>
								<div class="col-sm-8 hidden-xs pad5B pad5T">
									<div class="progress">
										<div class="progress-bar bg-color-first" role="progressbar" aria-valuenow="70"
										aria-valuemin="0" aria-valuemax="100" style={{width:"70%"}}>
											<span class="sr-only">70% Complete</span>
										</div>
									</div>
								</div>
								<div class="col-sm-1 col-xs-4 pad5B pad5T border-left" align="right">
									<span class="t-text">70%</span>
								</div>
							</div>
						</div>
						<div class="col-md-12 border-bottom">						
							<div class="row row-eq-height">
								<div class="col-sm-3 col-xs-8 border-right pad5B pad5T">
									<span class="t-icon">										
										<svg class="svg-second-color" width="18" height="18" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style={{background:"new 0 0 512 512;" ,whiteSpace: "normal"}}>
											<path d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z    M256,480C132.48,480,32,379.52,32,256S132.48,32,256,32s224,100.48,224,224S379.52,480,256,480z"/>
											<path d="M256,384c-54.784,0-99.36-44.576-99.36-99.36h-32C124.64,357.072,183.568,416,256,416   s131.36-58.928,131.36-131.36h-32C355.36,339.424,310.784,384,256,384z"/>
											<circle cx="164.736" cy="183.152" r="44.56"/>
											<circle cx="347.264" cy="183.152" r="44.56"/>
										</svg>
									</span>
									<span class="t-text">Yeah I’m Satisfied with it</span>
								</div>
								<div class="col-sm-8 hidden-xs pad5B pad5T">
									<div class="progress">
										<div class="progress-bar bg-color-second" role="progressbar" aria-valuenow="70"
										aria-valuemin="0" aria-valuemax="100" style={{width:"25%"}}>
											<span class="sr-only">25% Complete</span>
										</div>
									</div>
								</div>
								<div class="col-sm-1 col-xs-4 pad5B pad5T border-left" align="right">
									<span class="t-text">25%</span>
								</div>
							</div>
						</div>
						<div class="col-md-12 border-bottom">
							<div class="row row-eq-height">
								<div class="col-sm-3 col-xs-8 border-right pad5B pad5T">
									<span class="t-icon">										
										<svg class="svg-third-color" width="18" height="18" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style={{background:"new 0 0 512 512;" ,whiteSpace: "normal"}}>
											<path d="M256,512c141.392,0,256-114.608,256-256S397.392,0,256,0S0,114.608,0,256S114.608,512,256,512z    M256,32c123.52,0,224,100.48,224,224S379.52,480,256,480S32,379.52,32,256S132.48,32,256,32z"/>
											<circle cx="164.736" cy="183.152" r="44.56"/>
											<circle cx="347.264" cy="183.152" r="44.56"/>
											<path d="M124.736,340.08c0.88,0.64,59.184,43.328,136.384,43.328c38.88,0,82.56-10.832,126.112-43.312   l-19.12-25.664c-110.608,82.496-219.632,3.408-224.224,0L124.736,340.08z"/>
										</svg>
									</span>
									<span class="t-text">Average product, not bad</span>
								</div>
								<div class="col-sm-8 hidden-xs pad5B pad5T">
									<div class="progress">
										<div class="progress-bar bg-color-third" role="progressbar" aria-valuenow="70"
										aria-valuemin="0" aria-valuemax="100" style={{width:"7%"}}>
											<span class="sr-only">7% Complete</span>
										</div>
									</div>
								</div>
								<div class="col-sm-1 col-xs-4 pad5B pad5T border-left" align="right">
									<span class="t-text">7%</span>
								</div>
							</div>
						</div>
						<div class="col-md-12 border-bottom">						
							<div class="row row-eq-height">
								<div class="col-sm-3 col-xs-8 border-right pad5B pad5T">
									<span class="t-icon">										
										<svg class="svg-fourth-color" width="18" height="18" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style={{background:"new 0 0 512 512;" ,whiteSpace: "normal"}}>
											<path d="M256,512c141.392,0,256-114.608,256-256S397.392,0,256,0S0,114.608,0,256S114.608,512,256,512z
												 M256,32c123.52,0,224,100.48,224,224S379.52,480,256,480S32,379.52,32,256S132.48,32,256,32z"/>
											<circle cx="164.736" cy="183.152" r="44.56"/>
											<circle cx="347.264" cy="183.152" r="44.56"/>
											<path d="M143.904,380.496c4.592-3.408,113.664-82.448,224.224,0l19.12-25.664
												c-130-96.976-261.184-0.96-262.496,0.016L143.904,380.496z"/>
										</svg>
									</span>
									<span class="t-text">Not usefull at all it Sucks</span>
								</div>
								<div class="col-sm-8 hidden-xs pad5B pad5T">
									<div class="progress">
										<div class="progress-bar bg-color-fourth" role="progressbar" aria-valuenow="70"
										aria-valuemin="0" aria-valuemax="100" style={{width:"15%"}}>
											<span class="sr-only">15% Complete</span>
										</div>
									</div>
								</div>
								<div class="col-sm-1 col-xs-4 pad5B pad5T border-left" align="right">
									<span class="t-text">15%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{/* <!-- /.container-fluid--> 
<!-- /.content-wrapper--> */}
<footer class="sticky-footer">
	<div class="container">
		<div class="text-center"> <small>Copyright © Your Website 2017</small> </div>
	</div>
</footer>
{/* <!-- Scroll to Top Button-->  */}
<a class="scroll-to-top rounded" href="#page-top"> <i class="fa fa-angle-up"></i> </a> 
	 </div>
    )
  }
}

export default Dashboard;