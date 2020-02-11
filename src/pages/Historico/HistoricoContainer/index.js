import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import "../../../global.css";
import "./index.css";

import { GetLogsByCode } from "../../../services/contract";
import { setContractCode } from "../../Cadastros/Contratos/ContratosRedux/action";

class HistoricoContainer extends Component {
  state = {
    logs: []
  };

  componentDidMount = async () => {
    const query = {
      filters: {
        contract: {
          specific: {
            code: this.props.contractCode
          }
        }
      }
    };
    const { status, data } = await GetLogsByCode({ query });

    // console.log(data);

    if (status === 200) this.setState({ logs: data.rows });
  };

  componentWillUnmount = async () => {
    await this.props.setContractCode("");
  };

  render() {
    return (
      <div className="card-main">
        <div
          className="div-titulo"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h1 className="h1-titulo">Historico</h1>

          <div className="history-container-main">
            <div className="history-row-title">
              <div className="history-column-username">
                <strong>Usuário</strong>
              </div>
              <div className="history-column-action">
                <strong>Ação</strong>
              </div>
              <div className="history-column-date">
                <strong>Data/hora</strong>
              </div>
              <div className="history-column-log">
                <strong>Log</strong>
              </div>
            </div>
            {this.state.logs.map(item => {
              // console.log(item.log);
              // console.log(item);
              // console.log(JSON.parse(item.log));
              switch (item.type) {
                case "create":
                  const logCreate = JSON.parse(item.log);
                  // console.log(JSON.parse(item.log));
                  return (
                    <div className="history-row">
                      <div className="history-column-username">
                        <label>{item.user.username} </label>
                      </div>
                      <div className="history-column-action">
                        <label>{item.type}</label>
                      </div>
                      <div className="history-column-date">
                        <label>
                          {moment(item.createdAt).format("DD/MM/YYYY, h:mm")}
                        </label>
                      </div>
                      <div className="history-column-log">
                        <label>{logCreate.client.razaosocial} </label>
                        <label>{logCreate.client.cnpj} </label>
                        <label>{logCreate.client.group} </label>
                        <label>{logCreate.client.code} </label>
                        <label>{logCreate.status} </label>
                        <label>{logCreate.type} </label>
                        <label>{logCreate.stockBase} </label>
                      </div>
                    </div>
                  );
                case "addItem":
                  // console.log(item);
                  const logAddItem = JSON.parse(item.log);
                  console.log(JSON.parse(item.log));
                  console.log(logAddItem);
                  return (
                    <div className="history-row">
                      <div className="history-column-username">
                        <label>{item.user.username} </label>
                      </div>
                      <div className="history-column-action">
                        <label>{item.type}</label>
                      </div>
                      <div className="history-column-date">
                        <label>
                          {moment(item.createdAt).format("DD/MM/YYYY, h:mm")}
                        </label>
                      </div>
                      <div className="history-column-log">
                        <label>{logAddItem.price} </label>
                        <label>{logAddItem.item.name} </label>
                        <label>{logAddItem.item.type} </label>
                        <label>{logAddItem.item.code} </label>
                        <label>{logAddItem.item.description} </label>
                      </div>
                    </div>
                  );
                case "update":
                  return (
                    <div className="history-row">
                      <div className="history-column-username">
                        <label>{item.user.username} </label>
                      </div>
                      <div className="history-column-action">
                        <label>{item.type}</label>
                      </div>
                      <div className="history-column-date">
                        {moment(item.createdAt).format("DD/MM/YYYY, h:mm")}
                      </div>
                      <div className="history-column-log"></div>
                    </div>
                  );
                default:
                  return (
                    <div className="history-row">
                      <div className="history-column-username"></div>
                      <div className="history-column-action"></div>
                      <div className="history-column-date"></div>
                      <div className="history-column-log"></div>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractCode: state.contractCode
  };
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ setContractCode }, dispach);
}

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(HistoricoContainer);
