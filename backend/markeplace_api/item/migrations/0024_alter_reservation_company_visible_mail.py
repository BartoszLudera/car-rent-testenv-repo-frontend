# Generated by Django 5.0.4 on 2024-06-17 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0023_reservation_company_city_reservation_company_mail_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='company_visible_mail',
            field=models.CharField(default=1, max_length=255),
        ),
    ]
