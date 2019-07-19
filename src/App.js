import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

const api = 'http://localhost:1337/cruds/'

class App extends Component {

  constructor(props){
    super(props);
    this.state = { 
      title: "CRUD",
      act:0,
      index: '',
      datas: []
    }
  }

  async listar() {
    const { data: datas } = await axios.get(api);
    return this.setState({ datas });
  }

  async componentDidMount() {
    const { data: datas } = await axios.get(api);
    return this.setState({ datas });
    //this.refs.name.focus();
  }


  fSubmit = async () => {
    const obj = {
      name: this.refs.name.value,
      dia: this.refs.dia.value,
      descricao: this.refs.descricao.value
    };
    if(Object.keys(obj).every((k) => !obj[k])) {
      alert('Preencha os dados!');
      return;
    }

    if (this.state.act === 0) {
      axios.post(api, obj);
    } else {
      axios.put(api + this.state.index, obj);
    }

    this.setState({
      act: 0
    })

    this.refs.meuForm.reset();
    this.refs.name.focus();

    this.listar(0);
  }
  
  fRemove = (event,i) => {
    event.preventDefault();
    axios.delete(api + i);
    this.listar();
    this.listar();
    this.refs.meuForm.reset();
    this.refs.name.focus();
  }

  fEdit=(task, i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.dia.value = data.dia;
    this.refs.descricao.value = data.descricao;
    this.setState({
      act: 1,
      index: task
    });
    this.refs.name.focus();
  }

  render(){
    let datas = this.state.datas;
    return (
    <div className="App">
      <h2>{this.state.title}</h2>
      <form ref="meuForm" className="meuForm">
        <input type="text" ref="name" placeholder="Nome" className="formCamp" />
        <textarea type="text" ref="descricao" placeholder="Descrição" className="formCampA"/>
        <input type="date" ref="dia" placeholder="Data" className="diaCamp"/>
        <button onClick={(e)=>this.fSubmit(e)} className="myButton">enviar</button>
      </form>
      <pre>
      {datas.map((data, i) =>
      <li key={i} className="lista">
        {i+1}. {data.name}, {data.descricao}, {data.dia}
        <button id="remove" onClick={(e) => this.fRemove(e,data.id)} className="myListButton">excluir</button>
        <button onClick={() => this.fEdit(data.id, i)} className="myButtonA">editar</button>
      </li>
    )}
      </pre>
    </div>
  );
  }
}

export default App;
