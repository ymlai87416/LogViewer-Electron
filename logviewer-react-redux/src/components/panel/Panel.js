import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Panel.css';
import RegexPanelContent from './RegexPanelContent';
import LogfilePanelContent from './LogfilesPanelContent';
import LogLevelPanelContent from './LogLevelPanelContent';
import TextListPanelContent from './TextListPanelContent';
import SaveLoadSettingPanelContent from './SaveLoadSettingPanelContent';
import update from 'immutability-helper';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import Dialog from 'react-dialog';
import { 
  doLogsFilter, 
  doLogsFetch,
  doTextListIgnoreUpdate,
  doTextListIncludeUpdate,
  doConfigClipboardLoadClose,
  doControlPanelToggle,
} from '../../actions';
import { 
  getShowControlPanel, 
  getIgnoreTextList, 
  getIncludeTextList,
  getRowLoaded,
  getIsConfigDialogOpen,
  getIsLoading,
} from '../../selectors';

class Panel extends Component {

  constructor(props) {
    super(props);
  }

  onChangeHandlerWithReload = (key, value) => {
    var newState = update(this.state, {
      [key]: {$set: value}
    })

    this.setState(newState)
    this.props.onFilterLog(newState);
  }

  onExecuteReload = (param) => {
    this.props.onFetchLog(this.state)
  }

  loadConfig = (jsonString) => {
    //TODO:
  }

  copyToClipboard = (text) => {
    //TODO:
  }

  generateConfig = () => {
    //TODO:
  }

  openLoadConfigDialog = () => {
    //TODO;
  }
 
  closeLoadConfigDialog = (jsonMessage) => 
  { 
    //TODO:
  };

  generateConfigAndSaveToFile = () =>{
    //TODO:
  }

  selectConfigFile = (filename) => {
    //TODO:
  }

  render() {
    return (
      <div className="ControlPanel" aria-expanded={this.props.showControlPanel ? true: false} >
        <button className="MenuButton" onClick={this.props.onControlPanelToggle}>≡</button>
        <div className="ControlPanelContent">
          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Regex Settings</h3></AccordionItemTitle>
              <AccordionItemBody>
                <RegexPanelContent />
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem expanded='true'>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Log files</h3></AccordionItemTitle>
              <AccordionItemBody>
                <LogfilePanelContent />
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
          
          <hr className="panel-hr"/>

          <LogLevelPanelContent />

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Ignore Text</h3></AccordionItemTitle>
              <AccordionItemBody>
                <TextListPanelContent header="Ignore text: " textList={this.props.ignoreTextList} 
                  onTextListUpdate={this.props.onIgnoreTextListUpdate} ></TextListPanelContent>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Include Text</h3></AccordionItemTitle>
              <AccordionItemBody>
                <TextListPanelContent header="Include text: " textList={this.props.includeTextList}
                  onTextListUpdate={this.props.onIncludeTextListUpdate} ></TextListPanelContent>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Save/Load setting</h3></AccordionItemTitle>
              <AccordionItemBody>
              <SaveLoadSettingPanelContent />
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>
          
          <div className="finalRow" style={{textAlign: 'left'}}>          
            <button className="GogogoBtn" onClick={this.props.onFetchLog}> Go Go Go</button>
            <div className="loader" style={{display: 'inline-block', verticalAlign: 'middle', visibility: this.props.isLoading ? 'visible': 'hidden'}}></div>
            <span>Number of log row: </span>
            <span className="NumOfLog">{this.props.rowLoaded}</span>
          </div>
        </div>

        {
            this.props.isConfigDialogOpen &&
            <Dialog
                title="Enter config in json format here."
                className="ConfigDialog"
                onClose={() => this.props.onConfigClipboardDialogClose(false, null)}
                model="true"
                height='130px'
                buttons={
                    [
                      {
                        text: "OK",
                        onClick: () => {
                          const json = this.loadConfigTextInput.value
                          this.props.onConfigClipboardDialogClose(true, json)
                        },
                        className: "ConfigDialogButton"
                      },
                      {
                        text: "Cancel",
                        onClick: () => this.props.onConfigClipboardDialogClose(false, null),
                        className: "ConfigDialogButton"
                      }
                  ]
                }>
                <form>
                  <input type="text" ref={(ref) => this.loadConfigTextInput= ref} style={{width: '450px'}}/>
                </form>
            </Dialog>
        }
      </div>
    );
  }
}

const mapStoreToProps = (state) => ({
  showControlPanel: getShowControlPanel(state),
  ignoreTextList: getIgnoreTextList(state),
  includeTextList: getIncludeTextList(state),
  rowLoaded: getRowLoaded(state),
  isConfigDialogOpen: getIsConfigDialogOpen(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onControlPanelToggle: () => dispatch(doControlPanelToggle()),
  onFilterLog: () => dispatch(doLogsFilter()),
  onFetchLog: () => dispatch(doLogsFetch()),
  onIgnoreTextListUpdate: (ignoreList) => dispatch(doTextListIgnoreUpdate(ignoreList)),
  onIncludeTextListUpdate: (includeList) => dispatch(doTextListIncludeUpdate(includeList)),
  onConfigClipboardDialogClose: (dialogResult, text) => dispatch(doConfigClipboardLoadClose(dialogResult, text)),
});


export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Panel);
