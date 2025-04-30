package com.project.veterinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Cita;

@Repository
public interface ICitaRepository extends JpaRepository<Cita, Integer> {
    @Query("SELECT o FROM Cita o WHERE o.mascota.cliente.id = :id")
    List<Cita> findByCliente(@Param("id") Integer id);

    @Query("SELECT o FROM Cita o WHERE o.veterinario.id = :id AND DATE_FORMAT(o.fechaRegistro, '%Y-%m-%d')  = :fecha AND o.cancelado <> 1")
    List<Cita> findByVeterinario(@Param("id") Integer id, @Param("fecha") String fecha);
}
