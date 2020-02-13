import React, { Component } from "react";
import "../../../../global.css";
import "./index.css";
import { message } from "antd";
import {
  NewItem,
  GetItemByParams,
  DeleteItem
} from "../../../../services/item";
import { validator } from "./validator";
class NewItemContainer extends Component {
  state = {
    itemId: "",
    name: "",
    tipo: "",
    codigo: "",
    descricao: "",
    fieldErrors: {
      name: "",
      tipo: "",
      codigo: "",
      descricao: ""
    }
  };

  clearState = () => {
    this.setState({
      itemId: "",
      name: "",
      tipo: "",
      codigo: "",
      descricao: "",
      fieldErrors: {
        name: "",
        tipo: "",
        codigo: "",
        descricao: ""
      }
    });
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  onBlur = async e => {
    const { name, value } = e.target;
    const { fieldErrors } = this.state;

    this.setState({
      fieldErrors: { ...fieldErrors, [name]: validator(name, value) }
    });

    if (name === "name") {
      const { status, data } = await GetItemByParams({ name, value });

      if (status === 200 && data) {
        const {
          id: itemId,
          name,
          type: tipo,
          code: codigo,
          description: descricao
        } = data;
        this.setState({
          itemId,
          name,
          tipo,
          codigo,
          descricao
        });
      }

      console.log(status, data);
    }
  };

  onFocus = e => {
    const { name } = e.target;
    const { fieldErrors } = this.state;

    this.setState({
      fieldErrors: { ...fieldErrors, [name]: false }
    });
  };

  newItem = async () => {
    const {
      name,
      tipo: type,
      codigo: code,
      descricao: description
    } = this.state;

    const value = { name, type, code, description };

    const { status } = await NewItem(value);

    if (status === 200) {
      this.clearState();
      message.success("Item cadatrado com sucesso");
    }
  };

  render() {
    const { state, onFocus, onBlur } = this;
    const { fieldErrors } = state;
    return (
      <div className="card-main">
        <div className="div-titulo">
          <h1 className="h1-titulo">Itens</h1>
        </div>

        <div className="div-inputs-flex">
          <input
            className={`input-nome-item ${fieldErrors.name && "input-error"}`}
            onChange={this.onChange}
            placeholder="NOME"
            value={this.state.name}
            name="name"
            onBlur={onBlur}
            onFocus={onFocus}
          ></input>
          <input
            className={`input-tipo-item ${fieldErrors.tipo && "input-error"}`}
            onChange={this.onChange}
            placeholder="TIPO"
            value={this.state.tipo}
            name="tipo"
            onBlur={onBlur}
            onFocus={onFocus}
          ></input>
          <input
            className={`input-codigo-item  ${fieldErrors.codigo &&
              "input-error"}`}
            onChange={this.onChange}
            placeholder="CÓDIGO"
            value={this.state.codigo}
            name="codigo"
            onBlur={onBlur}
            onFocus={onFocus}
          ></input>
        </div>

        <div className="div-descricao-item">
          <label
            style={{
              fontFamily: "Bebas",
              fontSize: "20px",
              margin: "50px 0 0 25px"
            }}
          >
            Descricao
          </label>
          <textarea
            className={`textArea-descricao-item ${fieldErrors.descricao &&
              "input-error"}`}
            value={this.state.descricao}
            placeholder="DIGITE A DESCRIÇÃO"
            name="descricao"
            rows="4"
            onChange={this.onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          ></textarea>
        </div>
        <div className="div-buttons-usuario">
          <button className="button-salvar" onClick={this.newItem}>
            {this.state.itemId ? "Atualizar" : "Cadastrar"}
          </button>
          <button
            className={`button-excluir ${!this.state.itemId &&
              "button-disabled"}`}
            onClick={
              this.state.itemId &&
              (async () => await DeleteItem(this.state.itemId))
            }
          >
            Excluir
          </button>
        </div>
      </div>
    );
  }
}

export default NewItemContainer;
