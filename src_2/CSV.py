import csv


class CSV:
    def escribir_vuelo(vuelo, filename = 'vuelos.csv'):
        with open('..\\data\\' + filename, 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerows([vuelo.values()])
                
        return 1


# with open('vuelos.csv', 'a', encoding='UTF8', newline='') as f:
#     writer = csv.writer(f)

#     # write the header
#     # writer.writerow(header)

#     # write the data
#     writer.writerow(data)