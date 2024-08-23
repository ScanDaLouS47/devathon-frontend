# 1. Conseguir un file en la response del backend

- ToDo: Fix response with backend. Return file is needed
- Realmente no hay ningún archivo pre-cargado, hay
- solo una preview de la img que se expone a través
- de un string (URL) y se necesita un File o
- FileList. Debería recibir del backend el archivo
- que se le envió para poder resolver el problema.
- Por este motivo `isDirty` no se puede utilizar
  ```
  if (!isDirty) {
   throw new ApiError('Please, modify at least one input');
  }
  ```


# 2. Crear filtro 'active / inactive' para las reservas
