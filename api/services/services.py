from config import StoredProcedures
from database import execute_procedure, execute_query
from models.models import Login, Material

def login_user(user_name, user_password, user_rol, autenticacion):
    params = (user_name, user_password, user_rol, autenticacion)
    result = execute_procedure(StoredProcedures.LOGIN_USER, params)
    if result:
        return Login(user_name, user_password, result[0][0], result[0][1])
    return None

def get_all_materials():
    #query = "SELECT * FROM inventario"
    query = f"SELECT * FROM {StoredProcedures.GET_MATERIAL}()"
    return execute_query(query)

def set_all_ubications():
    query = "SELECT ub.*, i.num_parte, i.id_material FROM ubicaciones ub INNER JOIN inventario i ON ub.id_ubicacion = i.ubicacion;"
    return execute_query(query)

def add_material(types, part_num, serial_num, weight_quantity, long_quantity, operator, clasification, ubication, respuesta="N/A"):
    flatter_params = (types, part_num, serial_num, weight_quantity, long_quantity, operator, clasification, ubication, respuesta)
    params_list = [item[0]  if isinstance(item, tuple) else item for item in flatter_params]
    params = tuple(params_list)
    result = execute_procedure(StoredProcedures.ADD_MATERIAL, params)
    print(f"Respuesta {result}")
    return None

def update_product(product_id, name, quantity, price):
    params = (product_id, name, quantity, price)
    return execute_procedure(StoredProcedures.UPDATE_PRODUCT, params)

def delete_material(data): 
    params = (data)
    return execute_procedure(StoredProcedures.DELETE_PRODUCT, params)

def search_material(table, doe):
    query = f"SELECT * FROM inventario WHERE num_parte LIKE '{doe}';"
    query_fix = (query.replace(",", ""))
    query_fixed = (query.replace("'", ""))
    print(query_fix)
    return execute_query(query_fixed)