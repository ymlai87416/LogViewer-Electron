import React, { Component } from 'react';

class SaveLoadSettingPanelContent extends PanelContent {

  GenerateConfig = () => {
    var config = GetConfigurationJson();
    copyToClipboard(config);
    alert("Configuration copied to clipboard.")
  }

  PromptLoadConfig = () => {
    if (RunningInElectron) {
      var dialogs = Dialogs(opts = {})
      dialogs.prompt('Enter config json below:', '', function (ok) {
        if (ok != undefined) {
          LoadConfig(ok);
        }
      })

    } else {
      var input = prompt("Enter config json below:");
      if (input != null) {
        LoadConfig(input);
      }
    }
  }

  GenerateConfigAndSaveToFile = () =>{
    var textToSave = GetConfigurationJson();

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'config.json';
    hiddenElement.click();
  }

  SelectConfigFile = () => {
    /*TODO*/

  }

  render() {
    return (
      <div className="SaveLoadSettingPanelContent" style="display: table;width: 100%;border:0;">
          <div class="row">
            <div class="column">
              <span>
                Clipboard:
              </span>
            </div>
            <div class="column">
              <button onClick={GenerateConfig()}>Generate</button>
              <button onClick={PromptLoadConfig()}>Load</button>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <span>
                File:
              </span>
            </div>
            <div class="column">
              <button onClick={GenerateConfigAndSaveToFile()}>Generate</button>
              <button onClick={SelectConfigFile()} id="FileLoadConfigBtn">Load</button>
              <input className="jsonFile" type="file" style="display:none"/>
            </div>
          </div>

        </div>
    );
  }
}

export default SaveLoadSettingPanelContent;
