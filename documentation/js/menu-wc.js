'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">activelife documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-2f7088a1ca5b51e0f680905608b7daa41898bd5fbd13b2d9cb028c185e72077feb7d81c0ceaa2750a5631187388b13a7030a194aecad6f3c88f40ba5ff16d0a8"' : 'data-bs-target="#xs-components-links-module-AppModule-2f7088a1ca5b51e0f680905608b7daa41898bd5fbd13b2d9cb028c185e72077feb7d81c0ceaa2750a5631187388b13a7030a194aecad6f3c88f40ba5ff16d0a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2f7088a1ca5b51e0f680905608b7daa41898bd5fbd13b2d9cb028c185e72077feb7d81c0ceaa2750a5631187388b13a7030a194aecad6f3c88f40ba5ff16d0a8"' :
                                            'id="xs-components-links-module-AppModule-2f7088a1ca5b51e0f680905608b7daa41898bd5fbd13b2d9cb028c185e72077feb7d81c0ceaa2750a5631187388b13a7030a194aecad6f3c88f40ba5ff16d0a8"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoTooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoTooltipComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CitasPageModule.html" data-type="entity-link" >CitasPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CitasPageModule-281385a654758f56fa72057f25640f9c7d67b932ed5aeb30ac7958d4059d3208f250244316d6760f90d215cf40046bfde20dd5482f1df40529883182cfbee408"' : 'data-bs-target="#xs-components-links-module-CitasPageModule-281385a654758f56fa72057f25640f9c7d67b932ed5aeb30ac7958d4059d3208f250244316d6760f90d215cf40046bfde20dd5482f1df40529883182cfbee408"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CitasPageModule-281385a654758f56fa72057f25640f9c7d67b932ed5aeb30ac7958d4059d3208f250244316d6760f90d215cf40046bfde20dd5482f1df40529883182cfbee408"' :
                                            'id="xs-components-links-module-CitasPageModule-281385a654758f56fa72057f25640f9c7d67b932ed5aeb30ac7958d4059d3208f250244316d6760f90d215cf40046bfde20dd5482f1df40529883182cfbee408"' }>
                                            <li class="link">
                                                <a href="components/CitasPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CitasPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CitasPageRoutingModule.html" data-type="entity-link" >CitasPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CrearRutinaPageModule.html" data-type="entity-link" >CrearRutinaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CrearRutinaPageModule-327b088a876d89df9cdbbc734597788896a7e3d5fa311007d6f2048c754dfa2f77b0014deb7f1280bbd9ddd0ecaf555bb37df08ef2338a8ed261bb1871652aa6"' : 'data-bs-target="#xs-components-links-module-CrearRutinaPageModule-327b088a876d89df9cdbbc734597788896a7e3d5fa311007d6f2048c754dfa2f77b0014deb7f1280bbd9ddd0ecaf555bb37df08ef2338a8ed261bb1871652aa6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CrearRutinaPageModule-327b088a876d89df9cdbbc734597788896a7e3d5fa311007d6f2048c754dfa2f77b0014deb7f1280bbd9ddd0ecaf555bb37df08ef2338a8ed261bb1871652aa6"' :
                                            'id="xs-components-links-module-CrearRutinaPageModule-327b088a876d89df9cdbbc734597788896a7e3d5fa311007d6f2048c754dfa2f77b0014deb7f1280bbd9ddd0ecaf555bb37df08ef2338a8ed261bb1871652aa6"' }>
                                            <li class="link">
                                                <a href="components/CrearRutinaPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrearRutinaPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CrearRutinaPageRoutingModule.html" data-type="entity-link" >CrearRutinaPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-a711197ee593ce3f65149095631a38d66734785c19838b25a4175a42e62be79cdddda6c662fc6a62ad75e7d9f850b20590f2d532a9094c15893f990db321f936"' : 'data-bs-target="#xs-components-links-module-HomePageModule-a711197ee593ce3f65149095631a38d66734785c19838b25a4175a42e62be79cdddda6c662fc6a62ad75e7d9f850b20590f2d532a9094c15893f990db321f936"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-a711197ee593ce3f65149095631a38d66734785c19838b25a4175a42e62be79cdddda6c662fc6a62ad75e7d9f850b20590f2d532a9094c15893f990db321f936"' :
                                            'id="xs-components-links-module-HomePageModule-a711197ee593ce3f65149095631a38d66734785c19838b25a4175a42e62be79cdddda6c662fc6a62ad75e7d9f850b20590f2d532a9094c15893f990db321f936"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemExerciseComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InfoRutinaPageModule.html" data-type="entity-link" >InfoRutinaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InfoRutinaPageModule-5c08993b272fd94ba8dfe562fdb60caaeee22c2371e8eba16d561e7b75b4c415ae2e2b2822ac761816eb7705d3a5dce4f42e8f6440707dbc2df1b56eb9a54f53"' : 'data-bs-target="#xs-components-links-module-InfoRutinaPageModule-5c08993b272fd94ba8dfe562fdb60caaeee22c2371e8eba16d561e7b75b4c415ae2e2b2822ac761816eb7705d3a5dce4f42e8f6440707dbc2df1b56eb9a54f53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoRutinaPageModule-5c08993b272fd94ba8dfe562fdb60caaeee22c2371e8eba16d561e7b75b4c415ae2e2b2822ac761816eb7705d3a5dce4f42e8f6440707dbc2df1b56eb9a54f53"' :
                                            'id="xs-components-links-module-InfoRutinaPageModule-5c08993b272fd94ba8dfe562fdb60caaeee22c2371e8eba16d561e7b75b4c415ae2e2b2822ac761816eb7705d3a5dce4f42e8f6440707dbc2df1b56eb9a54f53"' }>
                                            <li class="link">
                                                <a href="components/ExercisePrivateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExercisePrivateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoRutinaPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoRutinaPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalExerciseComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoRutinaPageRoutingModule.html" data-type="entity-link" >InfoRutinaPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LandingPageModule.html" data-type="entity-link" >LandingPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LandingPageModule-57b953b11d0ae5f59114a5964d0d1f856723dd5e4802ecf0d8425a57e7cefa41c65c2575d5ab6875c4977bf16649fad5245250f24de65c8d44008e84f43fcaee"' : 'data-bs-target="#xs-components-links-module-LandingPageModule-57b953b11d0ae5f59114a5964d0d1f856723dd5e4802ecf0d8425a57e7cefa41c65c2575d5ab6875c4977bf16649fad5245250f24de65c8d44008e84f43fcaee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LandingPageModule-57b953b11d0ae5f59114a5964d0d1f856723dd5e4802ecf0d8425a57e7cefa41c65c2575d5ab6875c4977bf16649fad5245250f24de65c8d44008e84f43fcaee"' :
                                            'id="xs-components-links-module-LandingPageModule-57b953b11d0ae5f59114a5964d0d1f856723dd5e4802ecf0d8425a57e7cefa41c65c2575d5ab6875c4977bf16649fad5245250f24de65c8d44008e84f43fcaee"' }>
                                            <li class="link">
                                                <a href="components/LandingPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LandingPageRoutingModule.html" data-type="entity-link" >LandingPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-055ae1ddc56331354ebb3119e857edc6dce1890d1321b33ecbb9c5874f95213513c50c69641be0e5d282265d1519f9067fc9ebc4f181a95b91a0080c7fcb4a56"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-055ae1ddc56331354ebb3119e857edc6dce1890d1321b33ecbb9c5874f95213513c50c69641be0e5d282265d1519f9067fc9ebc4f181a95b91a0080c7fcb4a56"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-055ae1ddc56331354ebb3119e857edc6dce1890d1321b33ecbb9c5874f95213513c50c69641be0e5d282265d1519f9067fc9ebc4f181a95b91a0080c7fcb4a56"' :
                                            'id="xs-components-links-module-LoginPageModule-055ae1ddc56331354ebb3119e857edc6dce1890d1321b33ecbb9c5874f95213513c50c69641be0e5d282265d1519f9067fc9ebc4f181a95b91a0080c7fcb4a56"' }>
                                            <li class="link">
                                                <a href="components/InfoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfilePageModule-a1aca0f596bf04b23bb086022079f24f9dbb1806950fc665649db1749261ea7895b51e9cb2b561025b5241000853ac7cfdccd9f02187668f081b26dd6f69033c"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-a1aca0f596bf04b23bb086022079f24f9dbb1806950fc665649db1749261ea7895b51e9cb2b561025b5241000853ac7cfdccd9f02187668f081b26dd6f69033c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-a1aca0f596bf04b23bb086022079f24f9dbb1806950fc665649db1749261ea7895b51e9cb2b561025b5241000853ac7cfdccd9f02187668f081b26dd6f69033c"' :
                                            'id="xs-components-links-module-ProfilePageModule-a1aca0f596bf04b23bb086022079f24f9dbb1806950fc665649db1749261ea7895b51e9cb2b561025b5241000853ac7cfdccd9f02187668f081b26dd6f69033c"' }>
                                            <li class="link">
                                                <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RutinasPageModule.html" data-type="entity-link" >RutinasPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RutinasPageModule-d39e159614cca9c3304ec2dd476a0fa7a2a71f5cc88d46769d038a8982c160740f1351928e63cc82ac3b6b0df713b51dae9181d22de846065a4ac5ab5a5cc940"' : 'data-bs-target="#xs-components-links-module-RutinasPageModule-d39e159614cca9c3304ec2dd476a0fa7a2a71f5cc88d46769d038a8982c160740f1351928e63cc82ac3b6b0df713b51dae9181d22de846065a4ac5ab5a5cc940"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RutinasPageModule-d39e159614cca9c3304ec2dd476a0fa7a2a71f5cc88d46769d038a8982c160740f1351928e63cc82ac3b6b0df713b51dae9181d22de846065a4ac5ab5a5cc940"' :
                                            'id="xs-components-links-module-RutinasPageModule-d39e159614cca9c3304ec2dd476a0fa7a2a71f5cc88d46769d038a8982c160740f1351928e63cc82ac3b6b0df713b51dae9181d22de846065a4ac5ab5a5cc940"' }>
                                            <li class="link">
                                                <a href="components/CardRutinePrivateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardRutinePrivateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RutinasPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RutinasPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RutinasPageRoutingModule.html" data-type="entity-link" >RutinasPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' : 'data-bs-target="#xs-components-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' :
                                            'id="xs-components-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' }>
                                            <li class="link">
                                                <a href="components/AddExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddExerciseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardExerciseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardRutineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardRutineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetalleExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetalleExerciseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalCitaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalCitaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalConfirmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalConfirmComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' : 'data-bs-target="#xs-directives-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' :
                                        'id="xs-directives-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' }>
                                        <li class="link">
                                            <a href="directives/AgrandarDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgrandarDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' :
                                            'id="xs-pipes-links-module-SharedModule-26ced79345b44cafdd8ef1e4c61941f8266de043dfcae41afbe2475629c169ed4ae1a0c87908430b87a828e1b60e0c2482ac29106e1e1e38f7974c8e0cb01b82"' }>
                                            <li class="link">
                                                <a href="pipes/PrimeraLetraMayusPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimeraLetraMayusPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TruncamientoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TruncamientoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuariosPageModule.html" data-type="entity-link" >UsuariosPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UsuariosPageModule-d967d6d3e6cef4018c2cd9e388e9ef2b58249d924ed6b26c3abfb27ede09a10cb1abc1d353829d455cc30c3de7ebea7420dcee6cb996fa5409644025c2072804"' : 'data-bs-target="#xs-components-links-module-UsuariosPageModule-d967d6d3e6cef4018c2cd9e388e9ef2b58249d924ed6b26c3abfb27ede09a10cb1abc1d353829d455cc30c3de7ebea7420dcee6cb996fa5409644025c2072804"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsuariosPageModule-d967d6d3e6cef4018c2cd9e388e9ef2b58249d924ed6b26c3abfb27ede09a10cb1abc1d353829d455cc30c3de7ebea7420dcee6cb996fa5409644025c2072804"' :
                                            'id="xs-components-links-module-UsuariosPageModule-d967d6d3e6cef4018c2cd9e388e9ef2b58249d924ed6b26c3abfb27ede09a10cb1abc1d353829d455cc30c3de7ebea7420dcee6cb996fa5409644025c2072804"' }>
                                            <li class="link">
                                                <a href="components/UsuariosPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuariosPageRoutingModule.html" data-type="entity-link" >UsuariosPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FirebaseAuthService.html" data-type="entity-link" >FirebaseAuthService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseMediaService.html" data-type="entity-link" >FirebaseMediaService</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidation.html" data-type="entity-link" >PasswordValidation</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BackgroundService.html" data-type="entity-link" >BackgroundService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CitasService.html" data-type="entity-link" >CitasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomTranslateService.html" data-type="entity-link" >CustomTranslateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseService.html" data-type="entity-link" >FirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientProvider.html" data-type="entity-link" >HttpClientProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientWebProvider.html" data-type="entity-link" >HttpClientWebProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtService.html" data-type="entity-link" >JwtService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MediaService.html" data-type="entity-link" >MediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RutinaService.html" data-type="entity-link" >RutinaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Cita.html" data-type="entity-link" >Cita</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseDocument.html" data-type="entity-link" >FirebaseDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseStorageFile.html" data-type="entity-link" >FirebaseStorageFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseUserCredential.html" data-type="entity-link" >FirebaseUserCredential</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Media.html" data-type="entity-link" >Media</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rutina.html" data-type="entity-link" >Rutina</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCredentials.html" data-type="entity-link" >UserCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegisterInfo.html" data-type="entity-link" >UserRegisterInfo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});