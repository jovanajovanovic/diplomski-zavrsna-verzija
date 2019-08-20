from textx import metamodel_from_file

def create_model(path):
    model = metamodel_from_file('grammar.tx')
    example_model = model.model_from_str(path)

    return example_model
