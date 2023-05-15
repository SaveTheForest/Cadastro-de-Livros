CREATE DATABASE livraria;

USE livraria;

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  descricao TEXT
);
SELECT * FROM livraria.livros;
